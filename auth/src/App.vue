<script setup lang="ts">
import { Button } from '@/components/ui/button';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { reactive } from 'vue';

const { supabase, onNavigate } = defineProps(['supabase', 'onNavigate']);
interface SignInValues {
  email: string;
  password: string;
  error: string | null;
}
interface SignUpValues {
  email: string;
  password: string;
  confirmPassword: string;
  error: string | null;
}

const signInValues = reactive<SignInValues>({
  email: '',
  password: '',
  error: null,
});

const signUpValues = reactive<SignUpValues>({
  email: '',
  password: '',
  confirmPassword: '',
  error: null,
});

async function handleSignIn() {
  try {
    const { error } = await supabase.auth.signInWithPassword({
      email: signInValues.email,
      password: signInValues.password,
    });

    if (error) throw new Error(error);

    onNavigate({ to: '/tasks' });
  } catch (error) {
    if (error instanceof Error) {
      signInValues.error = error.message;
    }
    console.error(error);
  }
}

async function handleSignUp() {
  try {
    if (signUpValues.password !== signUpValues.confirmPassword) {
      throw new Error('Passwords do not match');
    }

    const { error } = await supabase.auth.signUp({
      email: signUpValues.email,
      password: signUpValues.password,
    });

    if (error) throw new Error(error);

    onNavigate({ to: '/tasks' });
  } catch (error) {
    if (error instanceof Error) {
      signUpValues.error = error.message;
    }
    console.error(error);
  }
}
</script>

<template>
  <Tabs default-value="sign-in" class="w-ful max-w-[460px] mt-10 mx-auto">
    <TabsList class="grid w-full grid-cols-2">
      <TabsTrigger value="sign-in"> Sign In </TabsTrigger>
      <TabsTrigger value="sign-up"> Sign Up </TabsTrigger>
    </TabsList>
    <TabsContent value="sign-in">
      <Card>
        <CardHeader>
          <CardTitle>Sign In</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="email">Email</Label>
            <Input
              v-model="signInValues.email"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="space-y-1">
            <Label for="password">Password</Label>
            <Input
              v-model="signInValues.password"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div>
            <p className="text-red-500">{{ signInValues.error }}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="handleSignIn">Sign In</Button>
        </CardFooter>
      </Card>
    </TabsContent>
    <TabsContent value="sign-up">
      <Card>
        <CardHeader>
          <CardTitle>Sign Up</CardTitle>
        </CardHeader>
        <CardContent class="space-y-2">
          <div class="space-y-1">
            <Label for="email">Email</Label>
            <Input
              v-model="signUpValues.email"
              id="email"
              type="email"
              placeholder="Email"
            />
          </div>
          <div class="space-y-1">
            <Label for="password">Password</Label>
            <Input
              v-model="signUpValues.password"
              id="password"
              type="password"
              placeholder="Password"
            />
          </div>
          <div class="space-y-1">
            <Label for="confirm-password">Confirm Password</Label>
            <Input
              v-model="signUpValues.confirmPassword"
              id="confirm-password"
              type="password"
              placeholder="Confirm Password"
            />
          </div>
          <div>
            <p class="text-red-500">{{ signUpValues.error }}</p>
          </div>
        </CardContent>
        <CardFooter>
          <Button @click="handleSignUp">Sign Up</Button>
        </CardFooter>
      </Card>
    </TabsContent>
  </Tabs>
</template>

<style scoped></style>
