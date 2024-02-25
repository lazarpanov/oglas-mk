import { getIdToken, signInWithEmailAndPassword, type UserCredential } from "firebase/auth";
import type { Actions } from "./$types";
import { firebaseAuth } from "$lib/firebase";
import { redirect, type Action, error } from "@sveltejs/kit";
import { goto } from "$app/navigation";

export const actions: Actions = {
    default: async ({cookies, request, locals}) => {
        const formData = await request.formData();
        try {
            
            const email = formData.get('email') as string 
            const password = formData.get('password') as string
            const userCredential: UserCredential = await signInWithEmailAndPassword(firebaseAuth, email, password);

            const user = userCredential.user;
            const idToken = await getIdToken(user);
            console.log(idToken)
            // const response = signInWithEmailAndPassword(firebaseAuth, email, password)
            // if(!response) {
            //     throw new Error(`Something went wrong: {response}`)
            // }
            // const data = await response;
            // console.log(response.)
            cookies.set("bearerToken", idToken, {
              path:"/"
            })
      }
      catch(err: any) {
        console.log(err)
        error(401, {
          message: "Failed login"
        })
      }
      throw redirect(303, "/")
    }
} satisfies Actions;