import { useCartStore } from "@/stores/cart";
import { useRouter } from "vue-router";
import Message from "@/components/library/Message";
import Confirm from "@/components/library/Confirm";

export default function useCart() {
    const store = useCartStore()
    const router = useRouter()
}