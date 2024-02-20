import type { Actions } from "@sveltejs/kit";

export const actions: Actions = {
    default: async ({cookies, request, locals})=> {
        console.log('logout')
    }
};