package com.composerUI.library.components.complex

import androidx.compose.animation.animateColorAsState
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.foundation.text.BasicTextField
import androidx.compose.foundation.text.KeyboardOptions
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.input.KeyboardType
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun OtpInputField(
    otpText: String,
    onOtpTextChange: (String, Boolean) -> Unit,
    modifier: Modifier = Modifier,
    otpCount: Int = 6,
    shouldMask: Boolean = false,
    boxWidth: Dp = 48.dp,
    boxHeight: Dp = 56.dp,
    cornerRadius: Dp = 12.dp,
    primaryColor: Color = MaterialTheme.colorScheme.primary,
    containerColor: Color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.3f)
) {
    BasicTextField(
        modifier = modifier,
        value = otpText,
        onValueChange = {
            if (it.length <= otpCount) {
                onOtpTextChange(it, it.length == otpCount)
            }
        },
        keyboardOptions = KeyboardOptions(keyboardType = KeyboardType.NumberPassword),
        decorationBox = {
            Row(horizontalArrangement = Arrangement.spacedBy(8.dp)) {
                repeat(otpCount) { index ->
                    OtpCharView(
                        index = index,
                        text = otpText,
                        shouldMask = shouldMask,
                        boxWidth = boxWidth,
                        boxHeight = boxHeight,
                        cornerRadius = cornerRadius,
                        primaryColor = primaryColor,
                        containerColor = containerColor
                    )
                }
            }
        }
    )
}

@Composable
private fun OtpCharView(
    index: Int,
    text: String,
    shouldMask: Boolean,
    boxWidth: Dp,
    boxHeight: Dp,
    cornerRadius: Dp,
    primaryColor: Color,
    containerColor: Color
) {
    val isFocused = text.length == index
    val char = when {
        index >= text.length -> ""
        shouldMask -> "•"
        else -> text[index].toString()
    }

    val animatedBorderColor by animateColorAsState(
        targetValue = if (isFocused) primaryColor else Color.Transparent,
        label = "borderColor"
    )

    Box(
        modifier = Modifier
            .width(boxWidth)
            .height(boxHeight)
            .clip(RoundedCornerShape(cornerRadius))
            .background(containerColor)
            .border(
                width = if (isFocused) 2.dp else 0.dp,
                color = animatedBorderColor,
                shape = RoundedCornerShape(cornerRadius)
            ),
        contentAlignment = Alignment.Center
    ) {
        Text(
            text = char,
            style = MaterialTheme.typography.headlineMedium,
            fontWeight = FontWeight.Bold,
            color = if (char.isEmpty()) Color.Gray else MaterialTheme.colorScheme.onSurface,
            textAlign = TextAlign.Center
        )
    }
}

@Preview(showBackground = true)
@Composable
fun OtpInputFieldPreview() {
    MaterialTheme {
        var otpValue by remember { mutableStateOf("") }
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            Text("6-Digit OTP")
            OtpInputField(
                otpText = otpValue,
                onOtpTextChange = { value, _ -> otpValue = value }
            )

            var pinValue by remember { mutableStateOf("12") }
            Text("4-Digit Masked PIN")
            OtpInputField(
                otpText = pinValue,
                otpCount = 4,
                shouldMask = true,
                onOtpTextChange = { value, _ -> pinValue = value }
            )
        }
    }
}
