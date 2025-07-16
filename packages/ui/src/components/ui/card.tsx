import * as React from 'react';

import { TextRef, ViewRef } from '@rn-primitives/types';
import { Text, View } from 'react-native';

import { cn } from '../../lib/utils';
import { TextClassContext } from './text';

const Card = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: React.RefObject<ViewRef>;
}) => (
  <View
    ref={ref}
    className={cn(
      'border-border bg-card shadow-foreground rounded-lg border',
      className,
    )}
    {...props}
  />
);
Card.displayName = 'Card';

const CardHeader = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: React.RefObject<ViewRef>;
}) => (
  <View
    ref={ref}
    className={cn('flex flex-col space-y-1.5 p-6', className)}
    {...props}
  />
);
CardHeader.displayName = 'CardHeader';

const CardTitle = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text> & {
  ref?: React.RefObject<TextRef>;
}) => (
  <Text
    role="heading"
    aria-level={3}
    ref={ref}
    className={cn(
      'text-card-foreground text-2xl font-semibold leading-none tracking-tight',
      className,
    )}
    {...props}
  />
);
CardTitle.displayName = 'CardTitle';

const CardDescription = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof Text> & {
  ref?: React.RefObject<TextRef>;
}) => (
  <Text
    ref={ref}
    className={cn('text-muted-foreground text-sm', className)}
    {...props}
  />
);
CardDescription.displayName = 'CardDescription';

const CardContent = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: React.RefObject<ViewRef>;
}) => (
  <TextClassContext.Provider value="text-card-foreground">
    <View ref={ref} className={cn('p-6 pt-0', className)} {...props} />
  </TextClassContext.Provider>
);
CardContent.displayName = 'CardContent';

const CardFooter = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof View> & {
  ref?: React.RefObject<ViewRef>;
}) => (
  <View
    ref={ref}
    className={cn('flex flex-row items-center p-6 pt-0', className)}
    {...props}
  />
);
CardFooter.displayName = 'CardFooter';

export {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
};
