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

import { AdminCategoryDeleteButton } from "./admin-category-delete-button";

export function AdminCategoriesTable({
  categories,
}: {
  categories: Array<{
    id: string;
    name: string;
    slug: string;
    parentName: string | null;
    productCount: number;
    childCount: number;
    displayOrder: number;
    isActive: boolean;
  }>;
}) {
  return (
    <Card className="border-border/70 bg-card/92">
      <CardHeader>
        <div className="flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
          <div>
            <CardTitle>Categories</CardTitle>
            <CardDescription>
              Organize storefront structure and keep catalog taxonomy clean.
            </CardDescription>
          </div>
          <Button nativeButton={false} render={<Link href="/admin/categories/new" />}>
            Create category
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Name</TableHead>
              <TableHead>Slug</TableHead>
              <TableHead>Parent</TableHead>
              <TableHead>Products</TableHead>
              <TableHead>Children</TableHead>
              <TableHead>Order</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {categories.map((category) => (
              <TableRow key={category.id}>
                <TableCell className="font-medium">{category.name}</TableCell>
                <TableCell>{category.slug}</TableCell>
                <TableCell>{category.parentName ?? "Root"}</TableCell>
                <TableCell>{category.productCount}</TableCell>
                <TableCell>{category.childCount}</TableCell>
                <TableCell>{category.displayOrder}</TableCell>
                <TableCell>
                  <Badge variant={category.isActive ? "secondary" : "outline"}>
                    {category.isActive ? "Active" : "Inactive"}
                  </Badge>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex justify-end gap-2">
                    <Button
                      nativeButton={false}
                      variant="outline"
                      size="sm"
                      render={<Link href={`/admin/categories/${category.id}/edit`} />}
                    >
                      Edit
                    </Button>
                    <AdminCategoryDeleteButton categoryId={category.id} />
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
