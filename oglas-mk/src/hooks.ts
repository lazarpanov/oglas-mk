import { redirect, type Handle } from '@sveltejs/kit'

export const handle: Handle = async ({event, resolve}) => {
    const path = event.url.pathname;

    console.log(path)
    const whitelist = ["/dashboard", "/auth/log-in", "/auth/register"]

    if (!whitelist.includes(path)) {
        throw redirect(303, "/auth/log-in")
    }
    const response = await resolve(event);
    return response;
};