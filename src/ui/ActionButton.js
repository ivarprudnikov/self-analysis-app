import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

export const ActionButton = ({
  title,
  onPress,
  fillColor = 'white',
  textColor = 'navy',
  borderColor = 'navy',
  width = 120,
  height,
  disabled = false,
  flex,
  style,
}) => (
  <TouchableOpacity
    style={{
      textAlign: 'center',
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: fillColor,
      borderColor: borderColor,
      padding: 12,
      borderRadius: 8,
      maxHeight: 48,
      borderWidth: 1,
      borderBottomWidth: 2,
      width,
      height,
      flex,
      opacity: disabled ? 0.3 : 1,
      ...style,
    }}
    disabled={disabled}
    onPress={onPress}>
    <Text
      style={{
        color: textColor,
        textAlign: 'center',
        fontWeight: '700',
        fontSize: 16,
      }}
      maxFontSizeMultiplier={1.2}>
      {title}
    </Text>
  </TouchableOpacity>
);
