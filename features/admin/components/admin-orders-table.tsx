import { Badge } from "@/components/ui/badge";
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

export function AdminOrdersTable({
  orders,
}: {
  orders: Array<{
    id: string;
    orderNumber: string;
    customerEmail: string;
    status: string;
    totalCents: number;
    currencyCode: string;
    itemCount: number;
    placedAt: string;
  }>;
}) {
  return (
    <Card className="border-border/70 bg-card/92">
      <CardHeader>
        <CardTitle>All orders</CardTitle>
        <CardDescription>
          Every order currently stored in the database, newest first.
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Order</TableHead>
              <TableHead>Customer</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Items</TableHead>
              <TableHead>Total</TableHead>
              <TableHead>Placed</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {orders.map((order) => (
              <TableRow key={order.id}>
                <TableCell className="font-medium">{order.orderNumber}</TableCell>
                <TableCell>{order.customerEmail}</TableCell>
                <TableCell>
                  <Badge variant="outline">{order.status}</Badge>
                </TableCell>
                <TableCell>{order.itemCount}</TableCell>
                <TableCell>
                  {formatCartCurrency(order.totalCents, order.currencyCode)}
                </TableCell>
                <TableCell>
                  {new Intl.DateTimeFormat("en-US", {
                    dateStyle: "medium",
                    timeStyle: "short",
                  }).format(new Date(order.placedAt))}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </CardContent>
    </Card>
  );
}
