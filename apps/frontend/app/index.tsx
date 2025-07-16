import { Button, Text, useColorScheme } from '@kando/ui';
import { Link, Stack } from 'expo-router';

import { View } from 'react-native';
import { Container } from '~/components/Container';

export default function Home() {
  const { isDarkColorScheme, toggleColorScheme } = useColorScheme();
  return (
    <>
      <Stack.Screen options={{ title: 'Home' }} />
      <Container>
        <View className='flex-col gap-2 flex-1 justify-center '>
          <Link href={{ pathname: '/details', params: { name: 'Dan' } }} asChild>
            <Button>
              <Text>Show Details</Text>
            </Button>
          </Link>

          <Button onPress={() => toggleColorScheme()}>
            <Text>Theme: {isDarkColorScheme ? 'Dark' : 'Light'}</Text>
          </Button>
        </View>
      </Container>
    </>
  );
}
