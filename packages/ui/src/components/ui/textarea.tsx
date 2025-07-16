import * as React from 'react';

import { TextInput, type TextInputProps } from 'react-native';

import { cn } from '../../lib/utils';

function Textarea({
  className,
  multiline = true,
  numberOfLines = 4,
  placeholderClassName,
  ...props
}: TextInputProps & {
  ref?: React.Ref<TextInput>;
}) {
  return (
    <TextInput
      className={cn(
        'web:flex border-input bg-background native:text-lg native:leading-[1.25] text-foreground web:ring-offset-background placeholder:text-muted-foreground web:focus-visible:outline-none web:focus-visible:ring-2 web:focus-visible:ring-ring web:focus-visible:ring-offset-2 min-h-[80px] w-full rounded-md border px-3 py-2 text-base lg:text-sm',
        props.editable === false && 'web:cursor-not-allowed opacity-50',
        className,
      )}
      placeholderClassName={cn('text-muted-foreground', placeholderClassName)}
      multiline={multiline}
      numberOfLines={numberOfLines}
      textAlignVertical="top"
      {...props}
    />
  );
}

export { Textarea };
