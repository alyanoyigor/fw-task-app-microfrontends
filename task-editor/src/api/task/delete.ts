export const deleteTask = async ({
  id,
  supabase,
}: {
  id: number;
  supabase: any;
}) => {
  const { error } = await supabase.from('tasks').delete().eq('id', id);

  if (error) {
    throw new Error(error.message);
  }
};
