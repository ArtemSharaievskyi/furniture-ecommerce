import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { formatCartCurrency } from "@/features/cart/lib/cart-utils";

import { AdminProductDeleteButton } from "./admin-product-delete-button";

export function AdminProductsTable({
  products,
}: {
  products: Array<{
    id: string;
    name: string;
    sku: string;
    status: string;
    categoryName: string;
    priceCents: number;
    currencyCode: string;
    stockQuantity: number;
    updatedAt: string;
    featured: boolean;
  }>;
}) {
  return (
    <Card className="border-border/70 bg-card/92">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Products</CardTitle>
            <CardDescription>
              Review the full catalog, then create, update, or delete products.
            </CardDescription>
          </div>
          <Button nativeButton={false} render={<Link href="/admin/products/new" />}>
            Create product
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Product</TableHead>
              <TableHead>Category</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Price</TableHead>
              <TableHead>Stock</TableHead>
              <TableHead>Updated</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {products.map((product) => (
              <TableRow key={product.id}>
                <TableCell className="align-top">
                  <div className="flex flex-col gap-1">
                    <span className="font-medium text-foreground">{product.name}</span>
                    <span className="text-xs uppercase tracking-[0.16em] text-muted-foreground">
                      {product.sku}
                    </span>
                  </div>
                </TableCell>
                <TableCell>{product.categoryName}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-2">
                    <Badge variant="outline">{product.status}</Badge>
                    {product.featured ? <Badge variant="secondary">Featured</Badge> : null}
                  </div>
                </TableCell>
                <TableCell>
                  {formatCartCurrency(product.priceCents, product.currencyCode)}
                </TableCell>
                <TableCell>{product.stockQuantity}</TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                  }).format(new Date(product.updatedAt))}
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/products/${product.id}/edit`} />}
                    >
                      Edit
                    </Button>
                    <AdminProductDeleteButton productId={product.id} />
                  </div>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
