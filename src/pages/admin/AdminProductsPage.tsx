
import { useState } from "react";
import AdminLayout from "@/components/layouts/AdminLayout";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select } from "@/components/ui/select";
import { Checkbox } from "@/components/ui/checkbox";
import { products, categories } from "@/data/mockData";
import { toast } from "sonner";
import { Edit, Trash2, Plus } from "lucide-react";

const AdminProductsPage = () => {
  const [productsList, setProductsList] = useState(products);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");

  const handleAddProduct = () => {
    setCurrentProduct({
      id: `new-${Date.now()}`,
      name: "",
      description: "",
      price: 0,
      images: ["https://images.unsplash.com/photo-1527613426441-4da17471b66d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1470&q=80"],
      category: "",
      tags: [],
      rating: 0,
      reviewCount: 0,
      stock: 0,
      featured: false,
      new: true,
      bestSeller: false,
    });
    setIsDialogOpen(true);
  };

  const handleEditProduct = (product) => {
    setCurrentProduct({ ...product });
    setIsDialogOpen(true);
  };

  const handleDeleteProduct = (product) => {
    setCurrentProduct(product);
    setIsDeleteDialogOpen(true);
  };

  const confirmDeleteProduct = () => {
    setProductsList(productsList.filter(p => p.id !== currentProduct.id));
    setIsDeleteDialogOpen(false);
    toast.success(`Product "${currentProduct.name}" has been deleted.`);
  };

  const handleSaveProduct = (e) => {
    e.preventDefault();
    
    if (currentProduct.id.includes("new-")) {
      // Add new product
      setProductsList([...productsList, { ...currentProduct, id: Date.now().toString() }]);
      toast.success("Product added successfully!");
    } else {
      // Update existing product
      setProductsList(productsList.map(p => 
        p.id === currentProduct.id ? currentProduct : p
      ));
      toast.success("Product updated successfully!");
    }
    
    setIsDialogOpen(false);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentProduct({ ...currentProduct, [name]: value });
  };

  const handlePriceChange = (e) => {
    const value = parseFloat(e.target.value) || 0;
    setCurrentProduct({ ...currentProduct, [e.target.name]: value });
  };

  const handleCheckboxChange = (name, checked) => {
    setCurrentProduct({ ...currentProduct, [name]: checked });
  };

  const filteredProducts = productsList.filter(product => 
    product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    product.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <AdminLayout title="Products">
      <div className="mb-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="w-full sm:max-w-xs">
          <Input
            type="search"
            placeholder="Search products..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <Button onClick={handleAddProduct} className="bg-umi-orange hover:bg-orange-700">
          <Plus className="mr-2 h-4 w-4" /> Add Product
        </Button>
      </div>

      {/* Products Table */}
      <div className="bg-white rounded-lg shadow-sm overflow-hidden">
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Product
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Category
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Price
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Stock
                </th>
                <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th scope="col" className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {filteredProducts.map((product) => (
                <tr key={product.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="flex items-center">
                      <div className="flex-shrink-0 h-10 w-10">
                        <img
                          className="h-10 w-10 rounded-md object-cover"
                          src={product.images[0]}
                          alt={product.name}
                        />
                      </div>
                      <div className="ml-4">
                        <div className="text-sm font-medium text-gray-900">
                          {product.name}
                        </div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-500">
                      {product.category}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      ${product.price.toFixed(2)}
                    </div>
                    {product.discountPrice && (
                      <div className="text-xs text-gray-500 line-through">
                        ${product.discountPrice.toFixed(2)}
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm text-gray-900">
                      {product.stock}
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full 
                      ${product.stock > 0 ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                      {product.stock > 0 ? 'In Stock' : 'Out of Stock'}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-blue-600 hover:text-blue-800 mr-2"
                      onClick={() => handleEditProduct(product)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="text-red-600 hover:text-red-800"
                      onClick={() => handleDeleteProduct(product)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredProducts.length === 0 && (
          <div className="py-8 text-center">
            <p className="text-gray-500">No products found.</p>
          </div>
        )}
      </div>

      {/* Edit/Add Product Dialog */}
      {currentProduct && (
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogContent className="max-w-3xl">
            <DialogHeader>
              <DialogTitle>
                {currentProduct.id.includes("new-") ? "Add New Product" : "Edit Product"}
              </DialogTitle>
            </DialogHeader>
            
            <form onSubmit={handleSaveProduct}>
              <Tabs defaultValue="general">
                <TabsList className="mb-4">
                  <TabsTrigger value="general">General</TabsTrigger>
                  <TabsTrigger value="pricing">Pricing</TabsTrigger>
                  <TabsTrigger value="inventory">Inventory</TabsTrigger>
                </TabsList>
                
                <TabsContent value="general" className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <Label htmlFor="name">Product Name</Label>
                      <Input
                        id="name"
                        name="name"
                        value={currentProduct.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="description">Description</Label>
                      <Textarea
                        id="description"
                        name="description"
                        value={currentProduct.description}
                        onChange={handleInputChange}
                        rows={4}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="category">Category</Label>
                      <select
                        id="category"
                        name="category"
                        value={currentProduct.category}
                        onChange={handleInputChange}
                        className="w-full border border-gray-300 rounded-md px-3 py-2"
                        required
                      >
                        <option value="">Select Category</option>
                        {categories.map(category => (
                          <option key={category.id} value={category.name}>
                            {category.name}
                          </option>
                        ))}
                      </select>
                    </div>
                    
                    <div>
                      <Label htmlFor="image">Main Image URL</Label>
                      <Input
                        id="image"
                        name="image"
                        value={currentProduct.images[0]}
                        onChange={(e) => setCurrentProduct({
                          ...currentProduct,
                          images: [e.target.value, ...currentProduct.images.slice(1)]
                        })}
                        required
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="pricing" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="price">Regular Price ($)</Label>
                      <Input
                        id="price"
                        name="price"
                        type="number"
                        step="0.01"
                        min="0"
                        value={currentProduct.price}
                        onChange={handlePriceChange}
                        required
                      />
                    </div>
                    
                    <div>
                      <Label htmlFor="discountPrice">Discount Price ($)</Label>
                      <Input
                        id="discountPrice"
                        name="discountPrice"
                        type="number"
                        step="0.01"
                        min="0"
                        value={currentProduct.discountPrice || ""}
                        onChange={handlePriceChange}
                        placeholder="Leave empty if no discount"
                      />
                    </div>
                  </div>
                </TabsContent>
                
                <TabsContent value="inventory" className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="stock">Stock Quantity</Label>
                      <Input
                        id="stock"
                        name="stock"
                        type="number"
                        min="0"
                        value={currentProduct.stock}
                        onChange={(e) => setCurrentProduct({
                          ...currentProduct,
                          stock: parseInt(e.target.value) || 0
                        })}
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="featured"
                        checked={currentProduct.featured || false}
                        onCheckedChange={(checked) => handleCheckboxChange("featured", checked)}
                      />
                      <Label htmlFor="featured">Featured Product</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="new"
                        checked={currentProduct.new || false}
                        onCheckedChange={(checked) => handleCheckboxChange("new", checked)}
                      />
                      <Label htmlFor="new">New Product</Label>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <Checkbox
                        id="bestSeller"
                        checked={currentProduct.bestSeller || false}
                        onCheckedChange={(checked) => handleCheckboxChange("bestSeller", checked)}
                      />
                      <Label htmlFor="bestSeller">Best Seller</Label>
                    </div>
                  </div>
                </TabsContent>
              </Tabs>
              
              <DialogFooter className="mt-6">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => setIsDialogOpen(false)}
                >
                  Cancel
                </Button>
                <Button type="submit" className="bg-umi-orange hover:bg-orange-700">
                  Save Product
                </Button>
              </DialogFooter>
            </form>
          </DialogContent>
        </Dialog>
      )}

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Confirm Delete</DialogTitle>
          </DialogHeader>
          <p>
            Are you sure you want to delete the product "{currentProduct?.name}"?
            This action cannot be undone.
          </p>
          <DialogFooter>
            <Button
              variant="outline"
              onClick={() => setIsDeleteDialogOpen(false)}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={confirmDeleteProduct}
            >
              Delete
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </AdminLayout>
  );
};

export default AdminProductsPage;
