import { supabase } from "../supabase";

export async function addTeamToDB(name: string) {
  const { data, error } = await supabase.from("Teams").insert([{ name }]);

  if (error) {
    throw new Error(`Postgres Error: ${error.message} (Code: ${error.code})`);
  }

  return data;
}
