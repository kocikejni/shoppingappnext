import ProductCard from '@/assets/ProductCard'
import { prisma } from '@/lib/db/prisma'

export default async function Home() {

  const products = await prisma.products.findMany({
    orderBy: { id: 'desc' }
  })
  return (
    <div>
<ProductCard product={products[0]}/>
    </div>
  )
}