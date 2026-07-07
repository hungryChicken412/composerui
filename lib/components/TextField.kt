package com.composerUI.library.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.Animatable
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.interaction.collectIsFocusedAsState
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Email
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material.icons.filled.VisibilityOff
import androidx.compose.material3.Icon
import androidx.compose.material3.IconButton
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.drawBehind
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.Path
import androidx.compose.ui.graphics.SolidColor
import androidx.compose.ui.graphics.drawscope.Stroke
import androidx.compose.ui.graphics.graphicsLayer
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.text.input.PasswordVisualTransformation
import androidx.compose.ui.text.input.VisualTransformation
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

enum class TextFieldVariant { Outlined, Soft, Filled }
enum class TextFieldAdornment { Standard, Email, Password }

@Composable
fun PremiumTextField(
    value: String,
    onValueChange: (String) -> Unit,
    modifier: Modifier = Modifier,
    placeholder: String = "{$LabelText_01}",
    errorMessage: String? = null,
    variant: TextFieldVariant = TextFieldVariant.{$Variant_01},
    adornment: TextFieldAdornment = TextFieldAdornment.{$Adornment_01},
    cornerRadius: Dp = {$CornerRadius_01}.dp,
    primaryColor: Color = MaterialTheme.colorScheme.primary,
    errorColor: Color = MaterialTheme.colorScheme.error
) {
    val interactionSource = remember { MutableInteractionSource() }
    val isFocused by interactionSource.collectIsFocusedAsState()

    var passwordVisible by remember { mutableStateOf(false) }

    // Floating Label State
    val isFloating = isFocused || value.isNotEmpty()
    val labelScale by animateFloatAsState(
        targetValue = if (isFloating) 0.75f else 1f,
        label = "labelScale"
    )
    val labelTranslateY by animateFloatAsState(
        targetValue = if (isFloating) (-24).dp.value else 0f,
        label = "labelTranslateY"
    )
    val labelColor by animateColorAsState(
        targetValue = when {
            errorMessage != null -> errorColor
            isFocused -> primaryColor
            else -> Color.Gray
        },
        label = "labelColor"
    )

    // Measure label width for the "Broken Path" gap
    var labelWidth by remember { mutableFloatStateOf(0f) }

    // Animation: Shake Effect
    val shakeOffset = remember { Animatable(0f) }
    LaunchedEffect(errorMessage) {
        if (errorMessage != null) {
            shakeOffset.animateTo(15f, tween(50))
            shakeOffset.animateTo(-15f, tween(50))
            shakeOffset.animateTo(10f, tween(50))
            shakeOffset.animateTo(-10f, tween(50))
            shakeOffset.animateTo(0f, tween(50))
        }
    }

    val isError = errorMessage != null
    val targetBorderColor = when {
        isError -> errorColor
        isFocused -> primaryColor
        variant == TextFieldVariant.Outlined -> Color.Gray.copy(alpha = 0.3f)
        else -> Color.Transparent
    }

    val targetBackgroundColor = when (variant) {
        TextFieldVariant.Soft -> if (isFocused) Color.Transparent else Color.Gray.copy(alpha = 0.05f)
        TextFieldVariant.Filled -> Color.Gray.copy(alpha = 0.05f)
        TextFieldVariant.Outlined -> Color.Transparent
    }

    val animatedBorderColor by animateColorAsState(targetBorderColor, label = "border")
    val animatedBackgroundColor by animateColorAsState(targetBackgroundColor, label = "background")
    val borderWidth = if (isFocused || isError) 2.dp else 1.dp

    Column(modifier = modifier.padding(top = if (isFloating) 12.dp else 0.dp)) {
        BasicTextField(
            value = value,
            onValueChange = onValueChange,
            interactionSource = interactionSource,
            textStyle = MaterialTheme.typography.bodyLarge.copy(
                color = MaterialTheme.colorScheme.onSurface
            ),
            singleLine = true,
            cursorBrush = SolidColor(if (isError) errorColor else primaryColor),
            visualTransformation = if (adornment == TextFieldAdornment.Password && !passwordVisible)
                PasswordVisualTransformation() else VisualTransformation.None,
            decorationBox = { innerTextField ->
                Box(
                    modifier = Modifier
                        .graphicsLayer { translationX = shakeOffset.value }
                        .fillMaxWidth()
                ) {
                    val labelPaddingStart = if (adornment == TextFieldAdornment.Email) 48.dp else 12.dp

                    // Main Input Container with Manual Path Construction
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        modifier = Modifier
                            .fillMaxWidth()
                            .heightIn(min = 56.dp)
                            .clip(RoundedCornerShape(cornerRadius))
                            .background(animatedBackgroundColor)
                            .drawBehind {
                                if (variant == TextFieldVariant.Outlined || isError || isFocused) {
                                    val strokeWidth = borderWidth.toPx()
                                    val r = cornerRadius.toPx()
                                    val w = size.width
                                    val h = size.height

                                    // Calculate the gap area
                                    val gapWidth = if (isFloating) (labelWidth * labelScale) + 8.dp.toPx() else 0f
                                    val gapStart = labelPaddingStart.toPx() - 4.dp.toPx()
                                    val gapEnd = gapStart + gapWidth

                                    // Build the path MANUALLY to avoid drawing where the label is
                                    val borderPath = Path().apply {
                                        if (isFloating) {
                                            // Start at the end of the gap
                                            moveTo(gapEnd, 0f)
                                            // Top right corner and segment
                                            lineTo(w - r, 0f)
                                            arcTo(
                                                rect = androidx.compose.ui.geometry.Rect(w - 2 * r, 0f, w, 2 * r),
                                                startAngleDegrees = 270f,
                                                sweepAngleDegrees = 90f,
                                                forceMoveTo = false
                                            )
                                            // Right side
                                            lineTo(w, h - r)
                                            arcTo(
                                                rect = androidx.compose.ui.geometry.Rect(w - 2 * r, h - 2 * r, w, h),
                                                startAngleDegrees = 0f,
                                                sweepAngleDegrees = 90f,
                                                forceMoveTo = false
                                            )
                                            // Bottom side
                                            lineTo(r, h)
                                            arcTo(
                                                rect = androidx.compose.ui.geometry.Rect(0f, h - 2 * r, 2 * r, h),
                                                startAngleDegrees = 90f,
                                                sweepAngleDegrees = 90f,
                                                forceMoveTo = false
                                            )
                                            // Left side
                                            lineTo(0f, r)
                                            arcTo(
                                                rect = androidx.compose.ui.geometry.Rect(0f, 0f, 2 * r, 2 * r),
                                                startAngleDegrees = 180f,
                                                sweepAngleDegrees = 90f,
                                                forceMoveTo = false
                                            )
                                            // Segment back to the start of the gap
                                            lineTo(gapStart, 0f)
                                        } else {
                                            // Draw full rounded rect path normally when not floating
                                            addRoundRect(
                                                androidx.compose.ui.geometry.RoundRect(
                                                    rect = androidx.compose.ui.geometry.Rect(0f, 0f, w, h),
                                                    cornerRadius = androidx.compose.ui.geometry.CornerRadius(r)
                                                )
                                            )
                                        }
                                    }

                                    drawPath(
                                        path = borderPath,
                                        color = animatedBorderColor,
                                        style = Stroke(width = strokeWidth)
                                    )
                                }
                            }
                            .padding(horizontal = 16.dp, vertical = 14.dp)
                    ) {
                        if (adornment == TextFieldAdornment.Email) {
                            Icon(
                                imageVector = Icons.Default.Email,
                                contentDescription = "Email Icon",
                                tint = Color.Gray,
                                modifier = Modifier.padding(end = 12.dp).size(20.dp)
                            )
                        }

                        Box(modifier = Modifier.weight(1f)) {
                            innerTextField()
                        }

                        if (adornment == TextFieldAdornment.Password) {
                            IconButton(
                                onClick = { passwordVisible = !passwordVisible },
                                modifier = Modifier.size(24.dp)
                            ) {
                                Icon(
                                    imageVector = if (passwordVisible) Icons.Default.Visibility else Icons.Default.VisibilityOff,
                                    contentDescription = "Toggle Password Visibility",
                                    tint = Color.Gray
                                )
                            }
                        }
                    }

                    // Floating Label (Overlay)
                    Text(
                        text = placeholder,
                        color = labelColor,
                        style = MaterialTheme.typography.bodyLarge,
                        modifier = Modifier
                            .padding(start = labelPaddingStart)
                            .align(Alignment.CenterStart)
                            .onSizeChanged { labelWidth = it.width.toFloat() }
                            .graphicsLayer {
                                translationY = labelTranslateY * density
                                scaleX = labelScale
                                scaleY = labelScale
                                transformOrigin = androidx.compose.ui.graphics.TransformOrigin(0f, 0.5f)
                            }
                    )
                }
            }
        )

        // Error Message
        Box(
            modifier = Modifier
                .fillMaxWidth()
                .animateContentSize(animationSpec = tween(300))
        ) {
            if (isError) {
                Text(
                    text = errorMessage,
                    color = errorColor,
                    style = MaterialTheme.typography.labelSmall,
                    modifier = Modifier.padding(start = 16.dp, top = 4.dp)
                )
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun PremiumTextFieldDemoPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(24.dp),
            verticalArrangement = Arrangement.spacedBy(24.dp)
        ) {
            var text1 by remember { mutableStateOf("") }
            PremiumTextField(
                value = text1,
                onValueChange = { text1 = it },
                placeholder = "Full Name"
            )

            var text2 by remember { mutableStateOf("john@example.com") }
            PremiumTextField(
                value = text2,
                onValueChange = { text2 = it },
                placeholder = "Email Address",
                adornment = TextFieldAdornment.Email,
                variant = TextFieldVariant.Soft
            )

            var text4 by remember { mutableStateOf("wrong password") }
            PremiumTextField(
                value = text4,
                onValueChange = { text4 = it },
                placeholder = "Password",
                errorMessage = "Invalid password",
                adornment = TextFieldAdornment.Password
            )
        }
    }
}
