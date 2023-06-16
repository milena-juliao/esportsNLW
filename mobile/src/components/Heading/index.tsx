import React from 'react';
import { View, Text, ViewProps } from 'react-native';

import { styles } from './styles';

interface HeadingProps extends ViewProps {
    title: string;
    subtitle: string;
}

export function Heading({ title, subtitle, ...rest }: HeadingProps) {//...rest traz todo o restante das props que existem em ViewProps
    return (
        <View style={styles.container}>
            <Text style={styles.title}>
                {title}
            </Text>

            <Text style={styles.subtitle}>
                {subtitle}
            </Text>
        </View>
    );
}