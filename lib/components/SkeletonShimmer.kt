package com.composerUI.library.components

import androidx.compose.animation.core.*
import androidx.compose.foundation.background
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.*
import androidx.compose.ui.Modifier
import androidx.compose.ui.composed
import androidx.compose.ui.draw.clip
import androidx.compose.ui.geometry.Offset
import androidx.compose.ui.graphics.Brush
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.layout.onGloballyPositioned
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.IntSize
import androidx.compose.ui.unit.dp

/**
 * A modifier that adds a sweeping shimmer effect to any composable.
 */
fun Modifier.shimmerEffect(
    colors: List<Color> = listOf(
        Color.LightGray.copy(alpha = 0.6f),
        Color.LightGray.copy(alpha = 0.2f),
        Color.LightGray.copy(alpha = 0.6f),
    )
): Modifier = composed {
    var size by remember { mutableStateOf(IntSize.Zero) }
    val transition = rememberInfiniteTransition(label = "shimmer")
    val startOffsetX by transition.animateFloat(
        initialValue = -2 * size.width.toFloat(),
        targetValue = 2 * size.width.toFloat(),
        animationSpec = infiniteRepeatable(
            animation = tween(1000)
        ),
        label = "shimmerOffsetX"
    )

    background(
        brush = Brush.linearGradient(
            colors = colors,
            start = Offset(startOffsetX, 0f),
            end = Offset(startOffsetX + size.width.toFloat(), size.height.toFloat())
        )
    )
    .onGloballyPositioned {
        size = it.size
    }
}

/**
 * A basic skeleton block with a shimmer effect.
 */
@Composable
fun SkeletonShimmer(
    modifier: Modifier = Modifier,
    width: Dp = {$Width_01}.dp,
    height: Dp = {$Height_01}.dp,
    cornerRadius: {$CornerRadius_01} = 4.dp
) {
    Box(
        modifier = modifier
            .width(width)
            .height(height)
            .clip(RoundedCornerShape(cornerRadius))
            .shimmerEffect()
    )
}

@Preview(showBackground = true)
@Composable
fun SkeletonShimmerPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            // Text line skeletons
            SkeletonShimmer(width = 200.dp)
            SkeletonShimmer(width = 150.dp)
            
            // Profile style skeleton
            Row(horizontalArrangement = Arrangement.spacedBy(12.dp)) {
                SkeletonShimmer(width = 48.dp, height = 48.dp, cornerRadius = 24.dp)
                Column(verticalArrangement = Arrangement.spacedBy(8.dp)) {
                    SkeletonShimmer(width = 100.dp)
                    SkeletonShimmer(width = 60.dp)
                }
            }
            
            // Card skeleton
            SkeletonShimmer(width = 300.dp, height = 150.dp, cornerRadius = 12.dp)
        }
    }
}
