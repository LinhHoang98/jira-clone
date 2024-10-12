import {useMutation, useQueryClient} from "@tanstack/react-query";
import {InferRequestType, InferResponseType} from "hono";
import {toast} from "sonner";
import {client} from "@/lib/rpc";
import {useRouter} from "next/navigation";

type ResponseType = InferResponseType<typeof client.api.auth.logout["$post"]>;
type RequestType = InferRequestType<typeof client.api.auth.logout["$post"]>;

export const useLogout = () => {
    const router = useRouter();
    const queryClient = useQueryClient();

    const mutation = useMutation<
        ResponseType,
        Error,
        RequestType>({
        mutationFn: async () => {
            const response = await client.api.auth.logout["$post"]();
            return await response.json();
        },
        onSuccess: () => {
            toast.success("Logged out");
            router.refresh();
            queryClient.invalidateQueries({ queryKey: ["current"] });
        },
        onError: () => {
            toast.error("Failed to log out");
        }
    });
    return mutation;
}