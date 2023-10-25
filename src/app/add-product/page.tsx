import FormSubmitButton from "@/app/components/FormSubmitButton";
import { prisma } from "@/lib/db/prisma";
import { redirect } from "next/navigation";

export const metadata = {
    title: 'Add your product on Shopli'
}

async function addProduct(formData: FormData) {
    "use server"
    const name = formData.get('name')?.toString();
    const description = formData.get('description')?.toString();
    const imageURL = formData.get('imageURL')?.toString();
    const price = Number(formData.get('price') || 0);

    if (!name || !description || !imageURL || !price) {
        throw new Error('Missing required fields');
    }

    await prisma.products.create({
        data: { name, description, imageURL, price }
    });
    redirect("/")
}

export default function AddProductPage() {
    return (
        <div>
            <h1 className="text-lg mb-3 font-bold">Add Product</h1>
            <form action={addProduct}>
                <input required name="name" placeholder="Enter name" className="mb-3 w-full input input-bordered" />
                <textarea required name="description" placeholder="Enter description" className="textarea-bordered textarea mb-3 w-full" />
                <input required name="imageURL" placeholder="Upload image" className="mb-3 w-full input input-bordered" type="url" />
                <input required name="price" placeholder="Enter price" className="mb-3 w-full input input-bordered" type="number" />
                <FormSubmitButton className="btn-block" >Add Product</FormSubmitButton>
            </form>
        </div>
    )
}