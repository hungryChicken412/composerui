package com.composerUI.library.components

import androidx.compose.animation.animateColorAsState
import androidx.compose.animation.core.animateDpAsState
import androidx.compose.animation.core.tween
import androidx.compose.foundation.background
import androidx.compose.foundation.clickable
import androidx.compose.foundation.interaction.MutableInteractionSource
import androidx.compose.foundation.layout.*
import androidx.compose.foundation.shape.CircleShape
import androidx.compose.foundation.shape.RoundedCornerShape
import androidx.compose.material.icons.Icons
import androidx.compose.material.icons.filled.DarkMode
import androidx.compose.material.icons.filled.LightMode
import androidx.compose.material3.Icon
import androidx.compose.material3.MaterialTheme
import androidx.compose.runtime.Composable
import androidx.compose.runtime.getValue
import androidx.compose.runtime.remember
import androidx.compose.ui.Alignment
import androidx.compose.ui.Modifier
import androidx.compose.ui.draw.clip
import androidx.compose.ui.graphics.Color
import androidx.compose.ui.graphics.vector.ImageVector
import androidx.compose.ui.tooling.preview.Preview
import androidx.compose.ui.unit.Dp
import androidx.compose.ui.unit.dp

@Composable
fun PremiumSwitch(
    checked: Boolean,
    onCheckedChange: (Boolean) -> Unit,
    modifier: Modifier = Modifier,
    width: Dp = 64.dp,
    height: Dp = 32.dp,
    checkedColor: Color = Color(0xFF4B6CB7),
    uncheckedColor: Color = Color(0xFFE0E0E0),
    thumbColor: Color = Color.White,
    onIcon: ImageVector = Icons.Default.LightMode,
    offIcon: ImageVector = Icons.Default.DarkMode
) {
    val interactionSource = remember { MutableInteractionSource() }
    
    val trackColor by animateColorAsState(
        targetValue = if (checked) checkedColor else uncheckedColor,
        animationSpec = tween(durationMillis = 300),
        label = "trackColor"
    )
    
    val thumbOffset by animateDpAsState(
        targetValue = if (checked) width - height else 0.dp,
        animationSpec = tween(durationMillis = 300),
        label = "thumbOffset"
    )

    Box(
        modifier = modifier
            .width(width)
            .height(height)
            .clip(RoundedCornerShape(height / 2))
            .background(trackColor)
            .clickable(
                interactionSource = interactionSource,
                indication = null,
                onClick = { onCheckedChange(!checked) }
            ),
        contentAlignment = Alignment.CenterStart
    ) {
        // Track Icons
        Row(
            modifier = Modifier
                .fillMaxSize()
                .padding(horizontal = (height / 4)),
            horizontalArrangement = Arrangement.SpaceBetween,
            verticalAlignment = Alignment.CenterVertically
        ) {
            Icon(
                imageVector = offIcon,
                contentDescription = null,
                modifier = Modifier.size(height * 0.5f),
                tint = if (!checked) Color.Gray else Color.White.copy(alpha = 0.5f)
            )
            Icon(
                imageVector = onIcon,
                contentDescription = null,
                modifier = Modifier.size(height * 0.5f),
                tint = if (checked) Color.White else Color.Gray.copy(alpha = 0.5f)
            )
        }

        // Thumb
        Box(
            modifier = Modifier
                .offset(x = thumbOffset)
                .size(height)
                .padding(2.dp)
                .clip(CircleShape)
                .background(thumbColor),
            contentAlignment = Alignment.Center
        ) {
            Icon(
                imageVector = if (checked) onIcon else offIcon,
                contentDescription = null,
                modifier = Modifier.size(height * 0.6f),
                tint = if (checked) checkedColor else Color.Gray
            )
        }
    }
}

@Preview(showBackground = true)
@Composable
fun PremiumSwitchPreview() {
    MaterialTheme {
        Column(
            modifier = Modifier.padding(16.dp),
            verticalArrangement = Arrangement.spacedBy(16.dp)
        ) {
            PremiumSwitch(checked = true, onCheckedChange = {})
            PremiumSwitch(checked = false, onCheckedChange = {})
        }
    }
}
