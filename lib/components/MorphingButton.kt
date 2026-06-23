package com.composerUI.library.components

import androidx.compose.animation.AnimatedContent
import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.fadeIn
import androidx.compose.animation.fadeOut
import androidx.compose.animation.togetherWith
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.Box
import androidx.compose.foundation.layout.height
import androidx.compose.foundation.layout.size
import androidx.compose.foundation.layout.width
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.CircularProgressIndicator
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

enum class ButtonState {
    Idle, Loading, Success
}

@Composable
fun MorphingButton(
    onClick: () -> Unit,
    state: ButtonState,
    modifier: Modifier = Modifier,
    backgroundColor: Color = MaterialTheme.colorScheme.primary,
    successColor: Color = Color(0xFF4CAF50),
    cornerRadius: Dp = 12.dp,
    cornerRadiusResolved : Dp = 28.dp,

    text: String = "Submit",
    buttonWidthResolved : Dp = 56.dp,
    buttonWidthIdle : Dp = 200.dp,
    buttonHeight: Dp = 56.dp
) {
    val buttonWidth by animateDpAsState(
        targetValue = if (state == ButtonState.Idle) buttonWidthIdle else buttonWidthResolved,
        label = "Button Width"
    )
    
    val buttonColor by animateColorAsState(
        targetValue = if (state == ButtonState.Success) successColor else backgroundColor,
        label = "Button Color"
    )

    val currentCornerRadius by animateDpAsState(
        targetValue = if (state == ButtonState.Idle) cornerRadius else cornerRadiusResolved,
        label = "Corner Radius"
    )

    Box(
        modifier = modifier
            .width(buttonWidth)
            .height( buttonHeight)
            .clip(RoundedCornerShape(currentCornerRadius))
            .background(buttonColor)
            .clickable(enabled = state == ButtonState.Idle, onClick = onClick),
        contentAlignment = Alignment.Center
    ) {
        AnimatedContent(
            targetState = state,
            transitionSpec = {
                fadeIn() togetherWith fadeOut()
            },
            label = "Button Content"
        ) { targetState ->
            when (targetState) {
                ButtonState.Idle -> {
                    Text(
                        text = text,
                        color = Color.White,
                        style = MaterialTheme.typography.labelLarge
                    )
                }
                ButtonState.Loading -> {
                    CircularProgressIndicator(
                        modifier = Modifier.size(24.dp),
                        color = Color.White,
                        strokeWidth = 3.dp
                    )
                }
                ButtonState.Success -> {
                    Icon(
                        imageVector = Icons.Default.Check,
                        contentDescription = "Success",
                        tint = Color.White,
                        modifier = Modifier.size(24.dp)
                    )
                }
            }
        }
    }
}

@Preview
@Composable
fun MorphingButtonIdlePreview() {
    MorphingButton(onClick = {}, state = ButtonState.Idle)
}

@Preview
@Composable
fun MorphingButtonLoadingPreview() {
    MorphingButton(onClick = {}, state = ButtonState.Loading)
}

@Preview
@Composable
fun MorphingButtonSuccessPreview() {
    MorphingButton(onClick = {}, state = ButtonState.Success)
}
