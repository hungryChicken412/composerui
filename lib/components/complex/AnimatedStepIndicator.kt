package com.composerUI.library.components.complex

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.border
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Check
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.dp

enum class StepperOrientation { Horizontal, Vertical }

@Composable
fun AnimatedStepIndicator(
    currentStep: Int,
    totalSteps: Int,
    modifier: Modifier = Modifier,
    stepLabels: List<String> = emptyList(),
    orientation: StepperOrientation = StepperOrientation.Horizontal,
    activeColor: Color = MaterialTheme.colorScheme.primary,
    inactiveColor: Color = MaterialTheme.colorScheme.surfaceVariant,
    completedColor: Color = Color(0xFF4CAF50)
) {
    if (orientation == StepperOrientation.Horizontal) {
        Row(
            modifier = modifier.fillMaxWidth(),
            verticalAlignment = Alignment.CenterVertically
        ) {
            for (i in 0 until totalSteps) {
                StepItem(
                    index = i,
                    currentStep = currentStep,
                    totalSteps = totalSteps,
                    label = stepLabels.getOrNull(i),
                    orientation = orientation,
                    activeColor = activeColor,
                    inactiveColor = inactiveColor,
                    completedColor = completedColor,
                    modifier = Modifier.weight(1f, fill = i != totalSteps - 1)
                )
            }
        }
    } else {
        Column(
            modifier = modifier.fillMaxHeight(),
            horizontalAlignment = Alignment.Start
        ) {
            for (i in 0 until totalSteps) {
                StepItem(
                    index = i,
                    currentStep = currentStep,
                    totalSteps = totalSteps,
                    label = stepLabels.getOrNull(i),
                    orientation = orientation,
                    activeColor = activeColor,
                    inactiveColor = inactiveColor,
                    completedColor = completedColor
                )
            }
        }
    }
}

@Composable
private fun StepItem(
    index: Int,
    currentStep: Int,
    totalSteps: Int,
    label: String?,
    orientation: StepperOrientation,
    activeColor: Color,
    inactiveColor: Color,
    completedColor: Color,
    modifier: Modifier = Modifier
) {
    val isCompleted = index < currentStep
    val isActive = index == currentStep
    
    val circleColor by animateColorAsState(
        targetValue = when {
            isCompleted -> completedColor
            isActive -> activeColor
            else -> inactiveColor
        },
        label = "circleColor"
    )

    if (orientation == StepperOrientation.Horizontal) {
        Row(
            verticalAlignment = Alignment.CenterVertically,
            modifier = modifier
        ) {
            // Step Circle
            StepCircle(circleColor, index + 1, isCompleted)

            // Progress Line (except for the last item)
            if (index < totalSteps - 1) {
                val progress by animateFloatAsState(
                    targetValue = if (index < currentStep) 1f else 0f,
                    animationSpec = tween(500),
                    label = "lineProgress"
                )
                
                Box(
                    modifier = Modifier
                        .weight(1f)
                        .height(4.dp)
                        .padding(horizontal = 4.dp)
                        .background(inactiveColor, CircleShape)
                ) {
                    Box(
                        modifier = Modifier
                            .fillMaxWidth(progress)
                            .fillMaxHeight()
                            .background(if (index < currentStep) completedColor else activeColor, CircleShape)
                    )
                }
            }
        }
    } else {
        // Vertical Implementation
        Row(modifier = Modifier.padding(bottom = 8.dp)) {
            Column(
                horizontalAlignment = Alignment.CenterHorizontally,
                modifier = Modifier.width(32.dp)
            ) {
                StepCircle(circleColor, index + 1, isCompleted)
                
                if (index < totalSteps - 1) {
                    val progress by animateFloatAsState(
                        targetValue = if (index < currentStep) 1f else 0f,
                        animationSpec = tween(500),
                        label = "lineProgressVertical"
                    )
                    Box(
                        modifier = Modifier
                            .width(4.dp)
                            .height(40.dp)
                            .padding(vertical = 4.dp)
                            .background(inactiveColor, CircleShape)
                    ) {
                        Box(
                            modifier = Modifier
                                .fillMaxWidth()
                                .fillMaxHeight(progress)
                                .background(if (index < currentStep) completedColor else activeColor, CircleShape)
                        )
                    }
                }
            }
            
            if (label != null) {
                Column(modifier = Modifier.padding(start = 12.dp, top = 4.dp)) {
                    Text(
                        text = label,
                        style = MaterialTheme.typography.bodyLarge,
                        fontWeight = if (isActive) FontWeight.Bold else FontWeight.Medium,
                        color = if (isActive) activeColor else MaterialTheme.colorScheme.onSurface
                    )
                }
            }
        }
    }
}

@Composable
private fun StepCircle(color: Color, stepNumber: Int, isCompleted: Boolean) {
    Box(
        modifier = Modifier
            .size(32.dp)
            .clip(CircleShape)
            .background(color)
            .border(2.dp, color.copy(alpha = 0.5f), CircleShape),
        contentAlignment = Alignment.Center
    ) {
        if (isCompleted) {
            Icon(
                imageVector = Icons.Default.Check,
                contentDescription = null,
                tint = Color.White,
                modifier = Modifier.size(20.dp)
            )
        } else {
            Text(
                text = stepNumber.toString(),
                color = Color.White,
                style = MaterialTheme.typography.labelLarge,
                fontWeight = FontWeight.Bold
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun StepperHorizontalPreview() {
    MaterialTheme {
        Column(modifier = Modifier.padding(16.dp)) {
            AnimatedStepIndicator(
                currentStep = 1,
                totalSteps = 4,
                stepLabels = listOf("Personal", "Address", "Payment", "Confirm")
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun StepperVerticalPreview() {
    MaterialTheme {
        Column(modifier = Modifier.padding(16.dp)) {
            AnimatedStepIndicator(
                currentStep = 2,
                totalSteps = 3,
                stepLabels = listOf("Account Created", "Identity Verified", "Ready to Trade"),
                orientation = StepperOrientation.Vertical
            )
        }
    }
}
