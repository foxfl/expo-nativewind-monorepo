import * as React from 'react';

import { useTheme } from '@react-navigation/native';
import { type VariantProps, cva } from 'class-variance-authority';
import { View, type ViewProps } from 'react-native';

import { cn } from '../../lib/utils';
import { Text } from './text';

const alertVariants = cva(
  'relative bg-background w-full rounded-lg border border-border p-4 shadow shadow-foreground/10 flex-row items-center',
  {
    variants: {
      variant: {
        default: '',
        destructive: 'border-destructive',
      },
    },
    defaultVariants: {
      variant: 'default',
    },
  },
);

function Alert({
  className,
  variant,
  children,
  icon: Icon,
  iconSize = 16,
  iconClassName,
  ...props
}: ViewProps &
  VariantProps<typeof alertVariants> & {
    ref?: React.RefObject<View>;
    icon?: React.ReactNode;
    iconSize?: number;
    iconClassName?: string;
  }) {
  const { colors } = useTheme();
  return (
    <View
      role="alert"
      className={alertVariants({ variant, className })}
      {...props}
    >
      {Icon && <View className="mr-2">{Icon}</View>}
      <View className="flex-1 flex-col gap-4">{children}</View>
    </View>
  );
}

function AlertTitle({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn(
        'text-foreground mb-1 pl-7 text-base font-medium leading-none tracking-tight',
        className,
      )}
      {...props}
    />
  );
}

function AlertDescription({
  className,
  ...props
}: React.ComponentProps<typeof Text>) {
  return (
    <Text
      className={cn('text-foreground pl-7 text-sm leading-relaxed', className)}
      {...props}
    />
  );
}

export { Alert, AlertDescription, AlertTitle };
