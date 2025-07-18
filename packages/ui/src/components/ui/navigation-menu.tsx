import * as React from 'react';

import * as NavigationMenuPrimitive from '@rn-primitives/navigation-menu';
import { cva } from 'class-variance-authority';
import { Platform, View } from 'react-native';
import Animated, {
  Extrapolation,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

import { ChevronDown } from '../../lib/icons/ChevronDown';
import { cn } from '../../lib/utils';

const NavigationMenu = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.Root>>;
}) => (
  <NavigationMenuPrimitive.Root
    ref={ref}
    className={cn(
      'relative z-10 flex max-w-max flex-row items-center justify-center',
      className,
    )}
    {...props}
  >
    {children}
    {Platform.OS === 'web' && <NavigationMenuViewport />}
  </NavigationMenuPrimitive.Root>
);
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

const NavigationMenuList = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List> & {
  ref?: React.RefObject<React.ElementRef<typeof NavigationMenuPrimitive.List>>;
}) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      'web:group web:list-none flex flex-1 flex-row items-center justify-center gap-1',
      className,
    )}
    {...props}
  />
);
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(
  'web:group web:inline-flex flex-row h-10 native:h-12 native:px-3 w-max items-center justify-center rounded-md bg-background px-4 py-2 text-sm font-medium web:transition-colors web:hover:bg-accent active:bg-accent web:hover:text-accent-foreground web:focus:bg-accent web:focus:text-accent-foreground web:focus:outline-none web:disabled:pointer-events-none disabled:opacity-50 web:data-[active]:bg-accent/50 web:data-[state=open]:bg-accent/50',
);

const NavigationMenuTrigger = ({
  ref,
  className,
  children,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Trigger> & {
  ref?: React.RefObject<
    React.ElementRef<typeof NavigationMenuPrimitive.Trigger>
  >;
}) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  const progress = useDerivedValue(() =>
    value === itemValue
      ? withTiming(1, { duration: 250 })
      : withTiming(0, { duration: 200 }),
  );
  const chevronStyle = useAnimatedStyle(() => ({
    transform: [{ rotate: `${progress.value * 180}deg` }],
    opacity: interpolate(progress.value, [0, 1], [1, 0.8], Extrapolation.CLAMP),
  }));

  return (
    <NavigationMenuPrimitive.Trigger
      ref={ref}
      className={cn(
        navigationMenuTriggerStyle(),
        'web:group gap-1.5',
        value === itemValue && 'bg-accent',
        className,
      )}
      {...props}
    >
      <>{children as React.ReactNode}</>
      <Animated.View style={chevronStyle}>
        <ChevronDown
          size={12}
          className={cn(
            'text-foreground web:transition web:duration-200 relative h-3 w-3',
          )}
          aria-hidden={true}
        />
      </Animated.View>
    </NavigationMenuPrimitive.Trigger>
  );
};
NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

const NavigationMenuContent = ({
  ref,
  className,
  children,
  portalHost,
  ...props
}) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();
  return (
    <NavigationMenuPrimitive.Portal hostName={portalHost}>
      <NavigationMenuPrimitive.Content
        ref={ref}
        className={cn(
          'native:border native:border-border native:rounded-lg native:shadow-lg native:bg-popover native:text-popover-foreground native:overflow-hidden w-full',
          value === itemValue
            ? 'web:animate-in web:fade-in web:slide-in-from-right-20'
            : 'web:animate-out web:fade-out web:slide-out-to-left-20',
          className,
        )}
        {...props}
      >
        <Animated.View
          entering={Platform.OS !== 'web' ? FadeInLeft : undefined}
          exiting={Platform.OS !== 'web' ? FadeOutLeft : undefined}
        >
          {children}
        </Animated.View>
      </NavigationMenuPrimitive.Content>
    </NavigationMenuPrimitive.Portal>
  );
};
NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

const NavigationMenuViewport = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Viewport> & {
  ref?: React.RefObject<
    React.ElementRef<typeof NavigationMenuPrimitive.Viewport>
  >;
}) => {
  return (
    <View className={cn('absolute left-0 top-full flex justify-center')}>
      <View
        className={cn(
          'web:origin-top-center web:h-[var(--radix-navigation-menu-viewport-height)] border-border bg-popover text-popover-foreground web:animate-in web:zoom-in-90 relative mt-1.5 w-full overflow-hidden rounded-md border shadow-lg',
          className,
        )}
        ref={ref}
        {...props}
      >
        <NavigationMenuPrimitive.Viewport />
      </View>
    </View>
  );
};
NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

const NavigationMenuIndicator = ({
  ref,
  className,
  ...props
}: React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Indicator> & {
  ref?: React.RefObject<
    React.ElementRef<typeof NavigationMenuPrimitive.Indicator>
  >;
}) => {
  const { value } = NavigationMenuPrimitive.useRootContext();
  const { value: itemValue } = NavigationMenuPrimitive.useItemContext();

  return (
    <NavigationMenuPrimitive.Indicator
      ref={ref}
      className={cn(
        'top-full z-[1] flex h-1.5 items-end justify-center overflow-hidden',
        value === itemValue
          ? 'web:animate-in web:fade-in'
          : 'web:animate-out web:fade-out',
        className,
      )}
      {...props}
    >
      <View className="bg-border shadow-foreground/5 relative top-[60%] h-2 w-2 rotate-45 rounded-tl-sm shadow-md" />
    </NavigationMenuPrimitive.Indicator>
  );
};
NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
};
