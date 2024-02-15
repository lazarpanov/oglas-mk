import { signInWithEmailAndPassword } from "firebase/auth";
import type { Actions } from "./$types";
import { firebaseAuth } from "$lib/firebase";
import { redirect, type Action } from "@sveltejs/kit";
import { goto } from "$app/navigation";

export const actions: Actions = {
    default: async ({cookies, request, locals}) => {
        const formData = await request.formData();
        try {
            
            const email = formData.get('email') as string 
            const password = formData.get('password') as string

            const response = signInWithEmailAndPassword(firebaseAuth, email, password)

            if(!response) {
                throw new Error(`Something went wrong: {response}`)
            }
        
            throw redirect(303, "/")
      }
      catch(err: any) {
        console.log(err)
      }
    }
} satisfies Actions;