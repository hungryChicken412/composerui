package com.composerUI.library.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.Code
import androidx.compose.material.icons.filled.ViewModule
import androidx.compose.material.icons.filled.Visibility
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.material3.Text
import androidx.compose.runtime.*
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.draw.shadow
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.layout.onSizeChanged
import androidx.compose.ui.platform.LocalDensity
import androidx.compose.ui.text.font.FontWeight
import androidx.compose.ui.text.style.TextAlign
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

data class SegmentItem(
    val label: String,
    val icon: ImageVector? = null
)

@Composable
fun SegmentedControl(
    items: List<SegmentItem>,
    selectedIndex: Int,
    onSegmentSelected: (Int) -> Unit,
    modifier: Modifier = Modifier,
    cornerRadius: Dp = 12.dp,
    trackColor: Color = MaterialTheme.colorScheme.surfaceVariant.copy(alpha = 0.5f),
    pillColor: Color = MaterialTheme.colorScheme.surface,
    activeTextColor: Color = MaterialTheme.colorScheme.primary,
    inactiveTextColor: Color = MaterialTheme.colorScheme.onSurfaceVariant
) {
    if (items.isEmpty()) return

    var totalWidth by remember { mutableFloatStateOf(0f) }
    val density = LocalDensity.current

    Box(
        modifier = modifier
            .fillMaxWidth()
            .height(48.dp)
            .onSizeChanged { totalWidth = it.width.toFloat() }
            .clip(RoundedCornerShape(cornerRadius))
            .background(trackColor)
            .padding(4.dp)
    ) {
        if (totalWidth > 0) {
            val segmentWidthDp = with(density) { (totalWidth / items.size).toDp() - 4.dp }
            
            val pillOffset by animateDpAsState(
                targetValue = segmentWidthDp * selectedIndex,
                animationSpec = tween(durationMillis = 300),
                label = "pillOffset"
            )

            Box(
                modifier = Modifier
                    .offset(x = pillOffset)
                    .width(segmentWidthDp)
                    .fillMaxHeight()
                    .shadow(elevation = 2.dp, shape = RoundedCornerShape(cornerRadius - 2.dp))
                    .background(pillColor, RoundedCornerShape(cornerRadius - 2.dp))
            )
        }

        Row(modifier = Modifier.fillMaxSize()) {
            items.forEachIndexed { index, item ->
                val isSelected = index == selectedIndex
                val contentColor by animateColorAsState(
                    targetValue = if (isSelected) activeTextColor else inactiveTextColor,
                    label = "contentColor"
                )

                Box(
                    modifier = Modifier
                        .weight(1f)
                        .fillMaxHeight()
                        .clickable(
                            interactionSource = remember { MutableInteractionSource() },
                            indication = null,
                            onClick = { onSegmentSelected(index) }
                        ),
                    contentAlignment = Alignment.Center
                ) {
                    Row(
                        verticalAlignment = Alignment.CenterVertically,
                        horizontalArrangement = Arrangement.Center
                    ) {
                        if (item.icon != null) {
                            Icon(
                                imageVector = item.icon,
                                contentDescription = null,
                                tint = contentColor,
                                modifier = Modifier
                                    .size(18.dp)
                                    .padding(end = 6.dp)
                            )
                        }
                        Text(
                            text = item.label,
                            style = MaterialTheme.typography.labelLarge,
                            fontWeight = if (isSelected) FontWeight.Bold else FontWeight.Medium,
                            color = contentColor,
                            textAlign = TextAlign.Center
                        )
                    }
                }
            }
        }
    }
}

@Preview(showBackground = true)
@Composable
fun SegmentedControlIconPreview() {
    MaterialTheme {
        var selectedIndex by remember { mutableIntStateOf(0) }
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            SegmentedControl(
                items = listOf(
                    SegmentItem("Preview", Icons.Default.Visibility),
                    SegmentItem("Code", Icons.Default.Code),
                    SegmentItem("Split", Icons.Default.ViewModule)
                ),
                selectedIndex = selectedIndex,
                onSegmentSelected = { selectedIndex = it }
            )
        }
    }
}
