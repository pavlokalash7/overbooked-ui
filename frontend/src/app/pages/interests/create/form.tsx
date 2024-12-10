'use client';

import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import axios from 'axios';
import { Plus, X } from 'lucide-react';

import { zodResolver } from '@hookform/resolvers/zod';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:8000';

const formSchema = z.object({
  user_id: z.string().min(1, {
    message: 'User id cannot be empty',
  }),
  preferences: z.array(z.string()).min(1, {
    message: 'You must add at least one preference.',
  }),
});

export function InterestsForm() {
  const {toast} = useToast();

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      user_id: '',
      preferences: [],
    },
  });

  const {control, handleSubmit, setValue, watch} = form;
  const preferences = watch('preferences');

  // Add a new preference
  const addItem = (newPreference: string) => {
    if (newPreference.trim()) {
      setValue('preferences', [ ...preferences, newPreference ]);
    }
  };

  // Remove a preference by index
  const removeItem = (index: number) => {
    const updatedPreferences = preferences.filter((_, i) => i !== index);
    setValue('preferences', updatedPreferences);
  };

  function onSubmit(values: z.infer<typeof formSchema>) {
    const {user_id, preferences} = values;

    axios
      .post(`${API_URL}/recommendations`, {
        user_id,
        preferences,
      })
      .then((response) => {
        if (response.status === 200) {
          toast({
            title: 'Saved',
            description: 'Recommendations generated successfully',
          });
        }
      })
      .catch((error) => {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: error.response?.data?.message || 'Something went wrong',
        });
      })
      .finally(() => {
        form.reset({
          user_id: '',
          preferences: [],
        });
      });
  }

  return (
    <Form {...form}>
      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        <div className="flex items-center">
          <span className="mr-2 min-w-5">User ID: </span>
          <FormField
            control={control}
            name="user_id"
            render={({field}) => (
              <FormItem>
                <FormControl>
                  <Input placeholder="User ID" {...field} />
                </FormControl>
                <FormMessage/>
              </FormItem>
            )}
          />
        </div>

        <div className="flex flex-col">
          <span className="mr-2">Interests: </span>
          <div>
            <FormItem>
              <Controller
                control={control}
                name="preferences"
                render={({field}) => (
                  <>
                    {field.value.length > 0 ? (
                      <ul className="space-y-2">
                        {field.value.map((preference, index) => (
                          <li
                            key={index}
                            className="flex items-center justify-between bg-gray-100 p-2 rounded-md"
                          >
                            <span className="text-gray-800">{preference}</span>
                            <button
                              type="button"
                              onClick={() => removeItem(index)}
                              className=""
                            >
                              <X />
                            </button>
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500 text-sm">
                        No interests added yet.
                      </p>
                    )}
                  </>
                )}
              />
              <FormMessage/>
            </FormItem>
            <div className="flex items-center space-x-2 mb-4 mt-4">
              <input
                type="text"
                className="flex-1 border border-gray-300 rounded-md px-4 py-2 text-gray-700"
                placeholder="Enter a preference"
                onKeyDown={(e) => {
                  if (e.key === 'Enter') {
                    e.preventDefault();
                    addItem(e.currentTarget.value);
                    e.currentTarget.value = '';
                  }
                }}
              />
              <button
                type="button"
                onClick={() => {
                  const inputElement = document.querySelector(
                    'input[placeholder=\'Enter a preference\']'
                  ) as HTMLInputElement;
                  if (inputElement?.value.trim()) {
                    addItem(inputElement.value);
                    inputElement.value = '';
                  }
                }}
                className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600"
              >
                <Plus/>
              </button>
            </div>
          </div>
        </div>
        <Button className="p-2 w-full" variant="outline" type="submit">Submit</Button>
      </form>
    </Form>
  );
}
