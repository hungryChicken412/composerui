package com.composerUI.library.components

import androidx.compose.animation.animateContentSize
import androidx.compose.animation.core.animateFloatAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.clickable
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.KeyboardArrowDown
import androidx.compose.material3.*
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.rotate
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun PremiumAccordion(
    title: String,
    modifier: Modifier = Modifier,
    expanded: Boolean = false,
    onExpandChange: (Boolean) -> Unit = {},
    cornerRadius: Dp = 12.dp,
    containerColor: Color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
    content: @Composable () -> Unit
) {
    val rotationState by animateFloatAsState(
        targetValue = if (expanded) 180f else 0f,
        label = "rotation"
    )

    Surface(
        modifier = modifier
            .fillMaxWidth()
            .clip(RoundedCornerShape(cornerRadius))
            .clickable { onExpandChange(!expanded) }
            .animateContentSize(
                animationSpec = tween(durationMillis = 300)
            ),
        color = containerColor,
        shape = RoundedCornerShape(cornerRadius),
        border = AssistChipDefaults.assistChipBorder(enabled = true, borderColor = MaterialTheme.colorScheme.outline.copy(alpha = 0.2f))
    ) {
        Column(
            modifier = Modifier
                .fillMaxWidth()
                .padding(16.dp)
        ) {
            Row(
                modifier = Modifier.fillMaxWidth(),
                verticalAlignment = Alignment.CenterVertically,
                horizontalArrangement = Arrangement.SpaceBetween
            ) {
                Text(
                    text = title,
                    style = MaterialTheme.typography.titleMedium,
                    color = MaterialTheme.colorScheme.onSurfaceVariant
                )
                Icon(
                    imageVector = Icons.Default.KeyboardArrowDown,
                    contentDescription = if (expanded) "Collapse" else "Expand",
                    modifier = Modifier.rotate(rotationState),
                    tint = MaterialTheme.colorScheme.onSurfaceVariant
                )
            }

            if (expanded) {
                Spacer(modifier = Modifier.height(12.dp))
                Box(modifier = Modifier.fillMaxWidth()) {
                    content()
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun PremiumAccordionPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            var expanded1 by remember { mutableStateOf(false) }
            PremiumAccordion(
                title = "What is Jetpack Compose?",
                expanded = expanded1,
                onExpandChange = { expanded1 = it }
            ) {
                Text(
                    text = "Jetpack Compose is Android’s modern toolkit for building native UI. It simplifies and accelerates UI development on Android with less code, powerful tools, and intuitive Kotlin APIs.",
                    style = MaterialTheme.typography.bodyMedium
                )
            }

            var expanded2 by remember { mutableStateOf(true) }
            PremiumAccordion(
                title = "Why use a Custom Accordion?",
                expanded = expanded2,
                onExpandChange = { expanded2 = it }
            ) {
                Text(
                    text = "Custom accordions allow for better integration with your app's unique design system, providing smoother animations and more flexible content layouts than standard components.",
                    style = MaterialTheme.typography.bodyMedium
                )
            }
        }
    }
}
