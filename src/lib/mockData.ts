// Mock Data for E-commerce Admin Dashboard

// Products
export interface ProductVariant {
  id: string;
  sku: string;
  option1: string;
  option2?: string;
  price: number;
  compareAtPrice?: number;
  cost: number;
  stock: number;
  barcode?: string;
}

export interface Product {
  id: string;
  title: string;
  description: string;
  status: 'draft' | 'active' | 'archived';
  category: string;
  vendor: string;
  price: { min: number; max: number };
  totalStock: number;
  variants: ProductVariant[];
  images: string[];
  updatedAt: string;
  createdAt: string;
}

export const products: Product[] = [
  {
    id: 'prod-1',
    title: 'قميص قطني كلاسيكي',
    description: 'قميص قطني عالي الجودة بتصميم كلاسيكي مريح',
    status: 'active',
    category: 'ملابس رجالية',
    vendor: 'مصنع النسيج الوطني',
    price: { min: 85, max: 120 },
    totalStock: 245,
    variants: [
      { id: 'v1', sku: 'SHIRT-WHT-S', option1: 'أبيض', option2: 'S', price: 85, compareAtPrice: 100, cost: 45, stock: 50 },
      { id: 'v2', sku: 'SHIRT-WHT-M', option1: 'أبيض', option2: 'M', price: 85, compareAtPrice: 100, cost: 45, stock: 65 },
      { id: 'v3', sku: 'SHIRT-BLU-S', option1: 'أزرق', option2: 'S', price: 90, compareAtPrice: 110, cost: 48, stock: 40 },
      { id: 'v4', sku: 'SHIRT-BLU-M', option1: 'أزرق', option2: 'M', price: 90, compareAtPrice: 110, cost: 48, stock: 45 },
      { id: 'v5', sku: 'SHIRT-BLK-L', option1: 'أسود', option2: 'L', price: 120, compareAtPrice: 140, cost: 55, stock: 45 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-15T10:30:00Z',
    createdAt: '2023-11-20T08:00:00Z',
  },
  {
    id: 'prod-2',
    title: 'حقيبة جلدية فاخرة',
    description: 'حقيبة يد جلدية طبيعية بتصميم عصري',
    status: 'active',
    category: 'إكسسوارات',
    vendor: 'ورشة الجلود الفاخرة',
    price: { min: 450, max: 550 },
    totalStock: 78,
    variants: [
      { id: 'v6', sku: 'BAG-BRN', option1: 'بني', price: 450, cost: 220, stock: 25 },
      { id: 'v7', sku: 'BAG-BLK', option1: 'أسود', price: 480, cost: 230, stock: 30 },
      { id: 'v8', sku: 'BAG-TAN', option1: 'بيج', price: 550, compareAtPrice: 650, cost: 250, stock: 23 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-14T15:45:00Z',
    createdAt: '2023-10-05T12:00:00Z',
  },
  {
    id: 'prod-3',
    title: 'ساعة ذكية رياضية',
    description: 'ساعة ذكية متعددة الوظائف مع تتبع اللياقة',
    status: 'active',
    category: 'إلكترونيات',
    vendor: 'تقنيات المستقبل',
    price: { min: 750, max: 950 },
    totalStock: 156,
    variants: [
      { id: 'v9', sku: 'WATCH-BLK', option1: 'أسود', price: 750, cost: 400, stock: 60 },
      { id: 'v10', sku: 'WATCH-SLV', option1: 'فضي', price: 850, cost: 450, stock: 50 },
      { id: 'v11', sku: 'WATCH-GLD', option1: 'ذهبي', price: 950, compareAtPrice: 1100, cost: 500, stock: 46 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-13T09:20:00Z',
    createdAt: '2023-12-01T10:00:00Z',
  },
  {
    id: 'prod-4',
    title: 'عطر عربي فاخر',
    description: 'عطر شرقي أصيل بمكونات طبيعية',
    status: 'active',
    category: 'عطور',
    vendor: 'دار العطور الشرقية',
    price: { min: 280, max: 450 },
    totalStock: 89,
    variants: [
      { id: 'v12', sku: 'PERF-50ML', option1: '50ml', price: 280, cost: 120, stock: 35 },
      { id: 'v13', sku: 'PERF-100ML', option1: '100ml', price: 450, compareAtPrice: 520, cost: 180, stock: 54 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-12T14:00:00Z',
    createdAt: '2023-09-15T11:00:00Z',
  },
  {
    id: 'prod-5',
    title: 'سماعات لاسلكية',
    description: 'سماعات بلوتوث عالية الجودة مع إلغاء الضوضاء',
    status: 'active',
    category: 'إلكترونيات',
    vendor: 'تقنيات المستقبل',
    price: { min: 320, max: 320 },
    totalStock: 5,
    variants: [
      { id: 'v14', sku: 'HEAD-BLK', option1: 'أسود', price: 320, cost: 160, stock: 3 },
      { id: 'v15', sku: 'HEAD-WHT', option1: 'أبيض', price: 320, cost: 160, stock: 2 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-11T16:30:00Z',
    createdAt: '2023-08-20T09:00:00Z',
  },
  {
    id: 'prod-6',
    title: 'فستان سهرة أنيق',
    description: 'فستان سهرة راقي بتصميم عصري',
    status: 'draft',
    category: 'ملابس نسائية',
    vendor: 'أزياء الشرق',
    price: { min: 650, max: 850 },
    totalStock: 42,
    variants: [
      { id: 'v16', sku: 'DRESS-BLK-S', option1: 'أسود', option2: 'S', price: 650, cost: 300, stock: 12 },
      { id: 'v17', sku: 'DRESS-RED-M', option1: 'أحمر', option2: 'M', price: 750, cost: 350, stock: 15 },
      { id: 'v18', sku: 'DRESS-NVY-L', option1: 'كحلي', option2: 'L', price: 850, cost: 400, stock: 15 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-10T11:15:00Z',
    createdAt: '2023-12-10T14:00:00Z',
  },
  {
    id: 'prod-7',
    title: 'حذاء رياضي مريح',
    description: 'حذاء رياضي خفيف مع تقنية امتصاص الصدمات',
    status: 'active',
    category: 'أحذية',
    vendor: 'مصنع الأحذية العربي',
    price: { min: 220, max: 280 },
    totalStock: 180,
    variants: [
      { id: 'v19', sku: 'SHOE-WHT-42', option1: 'أبيض', option2: '42', price: 220, cost: 100, stock: 45 },
      { id: 'v20', sku: 'SHOE-BLK-43', option1: 'أسود', option2: '43', price: 250, cost: 110, stock: 55 },
      { id: 'v21', sku: 'SHOE-GRY-44', option1: 'رمادي', option2: '44', price: 280, cost: 120, stock: 80 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-09T08:45:00Z',
    createdAt: '2023-07-01T10:00:00Z',
  },
  {
    id: 'prod-8',
    title: 'نظارة شمسية عصرية',
    description: 'نظارة شمسية بتصميم أنيق مع حماية UV',
    status: 'active',
    category: 'إكسسوارات',
    vendor: 'بصريات النخبة',
    price: { min: 180, max: 250 },
    totalStock: 95,
    variants: [
      { id: 'v22', sku: 'GLASS-BLK', option1: 'أسود', price: 180, cost: 80, stock: 40 },
      { id: 'v23', sku: 'GLASS-BRN', option1: 'بني', price: 200, cost: 85, stock: 30 },
      { id: 'v24', sku: 'GLASS-GLD', option1: 'ذهبي', price: 250, compareAtPrice: 300, cost: 100, stock: 25 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-08T13:20:00Z',
    createdAt: '2023-06-15T11:00:00Z',
  },
  {
    id: 'prod-9',
    title: 'محفظة جلدية رجالية',
    description: 'محفظة جلد طبيعي بتصميم عملي',
    status: 'archived',
    category: 'إكسسوارات',
    vendor: 'ورشة الجلود الفاخرة',
    price: { min: 120, max: 150 },
    totalStock: 0,
    variants: [
      { id: 'v25', sku: 'WALLET-BLK', option1: 'أسود', price: 120, cost: 50, stock: 0 },
      { id: 'v26', sku: 'WALLET-BRN', option1: 'بني', price: 150, cost: 60, stock: 0 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-07T09:00:00Z',
    createdAt: '2023-05-10T08:00:00Z',
  },
  {
    id: 'prod-10',
    title: 'قميص كتان صيفي',
    description: 'قميص كتان طبيعي مثالي لفصل الصيف',
    status: 'active',
    category: 'ملابس رجالية',
    vendor: 'مصنع النسيج الوطني',
    price: { min: 95, max: 130 },
    totalStock: 120,
    variants: [
      { id: 'v27', sku: 'LINEN-WHT-M', option1: 'أبيض', option2: 'M', price: 95, cost: 50, stock: 40 },
      { id: 'v28', sku: 'LINEN-BLU-L', option1: 'أزرق سماوي', option2: 'L', price: 110, cost: 55, stock: 40 },
      { id: 'v29', sku: 'LINEN-BEG-XL', option1: 'بيج', option2: 'XL', price: 130, cost: 60, stock: 40 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-06T14:30:00Z',
    createdAt: '2023-04-20T10:00:00Z',
  },
  {
    id: 'prod-11',
    title: 'عباية مطرزة',
    description: 'عباية أنيقة بتطريز يدوي فاخر',
    status: 'active',
    category: 'ملابس نسائية',
    vendor: 'أزياء الشرق',
    price: { min: 380, max: 550 },
    totalStock: 65,
    variants: [
      { id: 'v30', sku: 'ABAYA-BLK', option1: 'أسود', price: 380, cost: 180, stock: 25 },
      { id: 'v31', sku: 'ABAYA-NVY', option1: 'كحلي', price: 450, cost: 200, stock: 20 },
      { id: 'v32', sku: 'ABAYA-GRN', option1: 'أخضر زيتي', price: 550, cost: 250, stock: 20 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-05T11:45:00Z',
    createdAt: '2023-03-15T09:00:00Z',
  },
  {
    id: 'prod-12',
    title: 'حزام جلد طبيعي',
    description: 'حزام رجالي من الجلد الطبيعي',
    status: 'active',
    category: 'إكسسوارات',
    vendor: 'ورشة الجلود الفاخرة',
    price: { min: 75, max: 95 },
    totalStock: 150,
    variants: [
      { id: 'v33', sku: 'BELT-BLK-M', option1: 'أسود', option2: 'M', price: 75, cost: 35, stock: 50 },
      { id: 'v34', sku: 'BELT-BRN-L', option1: 'بني', option2: 'L', price: 85, cost: 38, stock: 50 },
      { id: 'v35', sku: 'BELT-TAN-XL', option1: 'بيج', option2: 'XL', price: 95, cost: 42, stock: 50 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-04T16:00:00Z',
    createdAt: '2023-02-10T12:00:00Z',
  },
  {
    id: 'prod-13',
    title: 'كريم العناية بالبشرة',
    description: 'كريم مرطب طبيعي للعناية اليومية',
    status: 'active',
    category: 'العناية الشخصية',
    vendor: 'مختبرات الجمال الطبيعي',
    price: { min: 85, max: 140 },
    totalStock: 200,
    variants: [
      { id: 'v36', sku: 'CREAM-50G', option1: '50g', price: 85, cost: 35, stock: 80 },
      { id: 'v37', sku: 'CREAM-100G', option1: '100g', price: 140, compareAtPrice: 170, cost: 55, stock: 120 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-03T10:20:00Z',
    createdAt: '2023-01-05T08:00:00Z',
  },
  {
    id: 'prod-14',
    title: 'شنطة سفر كبيرة',
    description: 'حقيبة سفر متينة بعجلات',
    status: 'draft',
    category: 'حقائب',
    vendor: 'صناعات السفر',
    price: { min: 350, max: 450 },
    totalStock: 35,
    variants: [
      { id: 'v38', sku: 'LUGGAGE-BLK', option1: 'أسود', price: 350, cost: 180, stock: 15 },
      { id: 'v39', sku: 'LUGGAGE-NVY', option1: 'كحلي', price: 400, cost: 200, stock: 10 },
      { id: 'v40', sku: 'LUGGAGE-GRY', option1: 'رمادي', price: 450, cost: 220, stock: 10 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-02T15:10:00Z',
    createdAt: '2022-12-20T11:00:00Z',
  },
  {
    id: 'prod-15',
    title: 'طقم أقلام فاخر',
    description: 'طقم أقلام حبر فاخر في علبة خشبية',
    status: 'active',
    category: 'مكتبيات',
    vendor: 'أدوات المكتب الراقية',
    price: { min: 180, max: 280 },
    totalStock: 45,
    variants: [
      { id: 'v41', sku: 'PENS-SLV', option1: 'فضي', price: 180, cost: 80, stock: 15 },
      { id: 'v42', sku: 'PENS-GLD', option1: 'ذهبي', price: 250, cost: 100, stock: 15 },
      { id: 'v43', sku: 'PENS-BLK', option1: 'أسود', price: 280, compareAtPrice: 350, cost: 120, stock: 15 },
    ],
    images: ['/placeholder.svg'],
    updatedAt: '2024-01-01T09:30:00Z',
    createdAt: '2022-11-15T10:00:00Z',
  },
];

// Orders
export interface OrderItem {
  productId: string;
  variantId: string;
  title: string;
  variantTitle: string;
  quantity: number;
  price: number;
}

export interface Order {
  id: string;
  orderNumber: string;
  customer: {
    id: string;
    name: string;
    email: string;
  };
  status: 'pending' | 'paid' | 'fulfilled' | 'refunded' | 'cancelled';
  paymentStatus: 'pending' | 'paid' | 'refunded';
  fulfillmentStatus: 'unfulfilled' | 'partial' | 'fulfilled';
  items: OrderItem[];
  subtotal: number;
  shipping: number;
  discount: number;
  tax: number;
  total: number;
  shippingAddress: {
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
  };
  createdAt: string;
  paidAt?: string;
  fulfilledAt?: string;
  shippedAt?: string;
  deliveredAt?: string;
}

export const orders: Order[] = [
  {
    id: 'ord-1',
    orderNumber: '#1001',
    customer: { id: 'cust-1', name: 'أحمد محمد العلي', email: 'ahmed@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-1', variantId: 'v1', title: 'قميص قطني كلاسيكي', variantTitle: 'أبيض / S', quantity: 2, price: 85 },
      { productId: 'prod-8', variantId: 'v22', title: 'نظارة شمسية عصرية', variantTitle: 'أسود', quantity: 1, price: 180 },
    ],
    subtotal: 350,
    shipping: 25,
    discount: 35,
    tax: 51,
    total: 391,
    shippingAddress: { name: 'أحمد محمد العلي', address: 'شارع الملك فهد 123', city: 'الرياض', country: 'السعودية', phone: '+966501234567' },
    createdAt: '2024-01-15T08:30:00Z',
    paidAt: '2024-01-15T08:35:00Z',
    fulfilledAt: '2024-01-16T10:00:00Z',
    shippedAt: '2024-01-16T14:00:00Z',
    deliveredAt: '2024-01-18T11:00:00Z',
  },
  {
    id: 'ord-2',
    orderNumber: '#1002',
    customer: { id: 'cust-2', name: 'فاطمة سعيد الحربي', email: 'fatima@example.com' },
    status: 'paid',
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-11', variantId: 'v31', title: 'عباية مطرزة', variantTitle: 'كحلي', quantity: 1, price: 450 },
    ],
    subtotal: 450,
    shipping: 0,
    discount: 0,
    tax: 68,
    total: 518,
    shippingAddress: { name: 'فاطمة سعيد الحربي', address: 'حي العليا، شارع التحلية', city: 'جدة', country: 'السعودية', phone: '+966507654321' },
    createdAt: '2024-01-14T14:20:00Z',
    paidAt: '2024-01-14T14:25:00Z',
  },
  {
    id: 'ord-3',
    orderNumber: '#1003',
    customer: { id: 'cust-3', name: 'محمد عبدالله القحطاني', email: 'mohammed@example.com' },
    status: 'pending',
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-3', variantId: 'v10', title: 'ساعة ذكية رياضية', variantTitle: 'فضي', quantity: 1, price: 850 },
      { productId: 'prod-5', variantId: 'v14', title: 'سماعات لاسلكية', variantTitle: 'أسود', quantity: 1, price: 320 },
    ],
    subtotal: 1170,
    shipping: 0,
    discount: 100,
    tax: 161,
    total: 1231,
    shippingAddress: { name: 'محمد عبدالله القحطاني', address: 'شارع الأمير سلطان 45', city: 'الدمام', country: 'السعودية', phone: '+966509876543' },
    createdAt: '2024-01-14T09:45:00Z',
  },
  {
    id: 'ord-4',
    orderNumber: '#1004',
    customer: { id: 'cust-4', name: 'نورة خالد الشمري', email: 'noura@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-4', variantId: 'v13', title: 'عطر عربي فاخر', variantTitle: '100ml', quantity: 2, price: 450 },
    ],
    subtotal: 900,
    shipping: 25,
    discount: 90,
    tax: 125,
    total: 960,
    shippingAddress: { name: 'نورة خالد الشمري', address: 'حي النرجس، شارع الأندلس', city: 'الرياض', country: 'السعودية', phone: '+966503456789' },
    createdAt: '2024-01-13T16:10:00Z',
    paidAt: '2024-01-13T16:15:00Z',
    fulfilledAt: '2024-01-14T09:00:00Z',
    shippedAt: '2024-01-14T11:30:00Z',
    deliveredAt: '2024-01-15T14:00:00Z',
  },
  {
    id: 'ord-5',
    orderNumber: '#1005',
    customer: { id: 'cust-5', name: 'عبدالرحمن سالم الغامدي', email: 'abdulrahman@example.com' },
    status: 'refunded',
    paymentStatus: 'refunded',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-7', variantId: 'v20', title: 'حذاء رياضي مريح', variantTitle: 'أسود / 43', quantity: 1, price: 250 },
    ],
    subtotal: 250,
    shipping: 25,
    discount: 0,
    tax: 41,
    total: 316,
    shippingAddress: { name: 'عبدالرحمن سالم الغامدي', address: 'شارع الأمير ناصر 78', city: 'المدينة المنورة', country: 'السعودية', phone: '+966504567890' },
    createdAt: '2024-01-12T11:30:00Z',
    paidAt: '2024-01-12T11:35:00Z',
  },
  {
    id: 'ord-6',
    orderNumber: '#1006',
    customer: { id: 'cust-6', name: 'سارة محمد العتيبي', email: 'sara@example.com' },
    status: 'paid',
    paymentStatus: 'paid',
    fulfillmentStatus: 'partial',
    items: [
      { productId: 'prod-2', variantId: 'v7', title: 'حقيبة جلدية فاخرة', variantTitle: 'أسود', quantity: 1, price: 480 },
      { productId: 'prod-13', variantId: 'v37', title: 'كريم العناية بالبشرة', variantTitle: '100g', quantity: 2, price: 140 },
    ],
    subtotal: 760,
    shipping: 0,
    discount: 50,
    tax: 107,
    total: 817,
    shippingAddress: { name: 'سارة محمد العتيبي', address: 'حي الصفا، شارع فلسطين', city: 'جدة', country: 'السعودية', phone: '+966505678901' },
    createdAt: '2024-01-11T13:45:00Z',
    paidAt: '2024-01-11T13:50:00Z',
    fulfilledAt: '2024-01-12T10:00:00Z',
  },
  {
    id: 'ord-7',
    orderNumber: '#1007',
    customer: { id: 'cust-7', name: 'خالد عمر الزهراني', email: 'khaled@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-12', variantId: 'v33', title: 'حزام جلد طبيعي', variantTitle: 'أسود / M', quantity: 1, price: 75 },
      { productId: 'prod-1', variantId: 'v3', title: 'قميص قطني كلاسيكي', variantTitle: 'أزرق / S', quantity: 2, price: 90 },
    ],
    subtotal: 255,
    shipping: 25,
    discount: 0,
    tax: 42,
    total: 322,
    shippingAddress: { name: 'خالد عمر الزهراني', address: 'شارع الثلاثين 156', city: 'الطائف', country: 'السعودية', phone: '+966506789012' },
    createdAt: '2024-01-10T10:20:00Z',
    paidAt: '2024-01-10T10:25:00Z',
    fulfilledAt: '2024-01-11T08:00:00Z',
    shippedAt: '2024-01-11T12:00:00Z',
    deliveredAt: '2024-01-13T09:00:00Z',
  },
  {
    id: 'ord-8',
    orderNumber: '#1008',
    customer: { id: 'cust-8', name: 'ريم عبدالعزيز المطيري', email: 'reem@example.com' },
    status: 'cancelled',
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-6', variantId: 'v17', title: 'فستان سهرة أنيق', variantTitle: 'أحمر / M', quantity: 1, price: 750 },
    ],
    subtotal: 750,
    shipping: 0,
    discount: 75,
    tax: 101,
    total: 776,
    shippingAddress: { name: 'ريم عبدالعزيز المطيري', address: 'حي الربوة، شارع العروبة', city: 'الرياض', country: 'السعودية', phone: '+966507890123' },
    createdAt: '2024-01-09T15:00:00Z',
  },
  {
    id: 'ord-9',
    orderNumber: '#1009',
    customer: { id: 'cust-9', name: 'يوسف إبراهيم الدوسري', email: 'youssef@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-15', variantId: 'v42', title: 'طقم أقلام فاخر', variantTitle: 'ذهبي', quantity: 1, price: 250 },
    ],
    subtotal: 250,
    shipping: 25,
    discount: 25,
    tax: 38,
    total: 288,
    shippingAddress: { name: 'يوسف إبراهيم الدوسري', address: 'شارع الخليج 89', city: 'الخبر', country: 'السعودية', phone: '+966508901234' },
    createdAt: '2024-01-08T09:15:00Z',
    paidAt: '2024-01-08T09:20:00Z',
    fulfilledAt: '2024-01-09T10:00:00Z',
    shippedAt: '2024-01-09T14:00:00Z',
    deliveredAt: '2024-01-11T11:00:00Z',
  },
  {
    id: 'ord-10',
    orderNumber: '#1010',
    customer: { id: 'cust-10', name: 'منى حسن السبيعي', email: 'mona@example.com' },
    status: 'paid',
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-11', variantId: 'v30', title: 'عباية مطرزة', variantTitle: 'أسود', quantity: 1, price: 380 },
      { productId: 'prod-4', variantId: 'v12', title: 'عطر عربي فاخر', variantTitle: '50ml', quantity: 1, price: 280 },
    ],
    subtotal: 660,
    shipping: 0,
    discount: 66,
    tax: 89,
    total: 683,
    shippingAddress: { name: 'منى حسن السبيعي', address: 'حي الملقا، شارع أبو بكر', city: 'الرياض', country: 'السعودية', phone: '+966509012345' },
    createdAt: '2024-01-07T14:30:00Z',
    paidAt: '2024-01-07T14:35:00Z',
  },
  {
    id: 'ord-11',
    orderNumber: '#1011',
    customer: { id: 'cust-11', name: 'عمر فيصل العنزي', email: 'omar@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-3', variantId: 'v11', title: 'ساعة ذكية رياضية', variantTitle: 'ذهبي', quantity: 1, price: 950 },
    ],
    subtotal: 950,
    shipping: 0,
    discount: 95,
    tax: 128,
    total: 983,
    shippingAddress: { name: 'عمر فيصل العنزي', address: 'شارع الملك عبدالله 234', city: 'بريدة', country: 'السعودية', phone: '+966501234568' },
    createdAt: '2024-01-06T11:00:00Z',
    paidAt: '2024-01-06T11:05:00Z',
    fulfilledAt: '2024-01-07T09:00:00Z',
    shippedAt: '2024-01-07T13:00:00Z',
    deliveredAt: '2024-01-09T10:00:00Z',
  },
  {
    id: 'ord-12',
    orderNumber: '#1012',
    customer: { id: 'cust-12', name: 'هند سعد الحارثي', email: 'hind@example.com' },
    status: 'pending',
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-2', variantId: 'v8', title: 'حقيبة جلدية فاخرة', variantTitle: 'بيج', quantity: 1, price: 550 },
    ],
    subtotal: 550,
    shipping: 0,
    discount: 0,
    tax: 83,
    total: 633,
    shippingAddress: { name: 'هند سعد الحارثي', address: 'حي الورود، شارع الأمير محمد', city: 'الرياض', country: 'السعودية', phone: '+966502345678' },
    createdAt: '2024-01-05T16:45:00Z',
  },
  {
    id: 'ord-13',
    orderNumber: '#1013',
    customer: { id: 'cust-1', name: 'أحمد محمد العلي', email: 'ahmed@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-10', variantId: 'v27', title: 'قميص كتان صيفي', variantTitle: 'أبيض / M', quantity: 3, price: 95 },
    ],
    subtotal: 285,
    shipping: 25,
    discount: 28,
    tax: 42,
    total: 324,
    shippingAddress: { name: 'أحمد محمد العلي', address: 'شارع الملك فهد 123', city: 'الرياض', country: 'السعودية', phone: '+966501234567' },
    createdAt: '2024-01-04T10:30:00Z',
    paidAt: '2024-01-04T10:35:00Z',
    fulfilledAt: '2024-01-05T08:00:00Z',
    shippedAt: '2024-01-05T11:00:00Z',
    deliveredAt: '2024-01-07T14:00:00Z',
  },
  {
    id: 'ord-14',
    orderNumber: '#1014',
    customer: { id: 'cust-13', name: 'سلمان راشد المالكي', email: 'salman@example.com' },
    status: 'paid',
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-7', variantId: 'v21', title: 'حذاء رياضي مريح', variantTitle: 'رمادي / 44', quantity: 2, price: 280 },
      { productId: 'prod-12', variantId: 'v34', title: 'حزام جلد طبيعي', variantTitle: 'بني / L', quantity: 1, price: 85 },
    ],
    subtotal: 645,
    shipping: 25,
    discount: 64,
    tax: 91,
    total: 697,
    shippingAddress: { name: 'سلمان راشد المالكي', address: 'شارع التخصصي 67', city: 'الرياض', country: 'السعودية', phone: '+966503456780' },
    createdAt: '2024-01-03T13:20:00Z',
    paidAt: '2024-01-03T13:25:00Z',
  },
  {
    id: 'ord-15',
    orderNumber: '#1015',
    customer: { id: 'cust-14', name: 'لمى عادل الرشيدي', email: 'lama@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-13', variantId: 'v36', title: 'كريم العناية بالبشرة', variantTitle: '50g', quantity: 4, price: 85 },
    ],
    subtotal: 340,
    shipping: 0,
    discount: 34,
    tax: 46,
    total: 352,
    shippingAddress: { name: 'لمى عادل الرشيدي', address: 'حي الياسمين، شارع الأمير سلمان', city: 'الرياض', country: 'السعودية', phone: '+966504567891' },
    createdAt: '2024-01-02T09:00:00Z',
    paidAt: '2024-01-02T09:05:00Z',
    fulfilledAt: '2024-01-03T10:00:00Z',
    shippedAt: '2024-01-03T14:00:00Z',
    deliveredAt: '2024-01-05T11:00:00Z',
  },
  {
    id: 'ord-16',
    orderNumber: '#1016',
    customer: { id: 'cust-15', name: 'طارق مبارك العمري', email: 'tarek@example.com' },
    status: 'pending',
    paymentStatus: 'pending',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-8', variantId: 'v24', title: 'نظارة شمسية عصرية', variantTitle: 'ذهبي', quantity: 1, price: 250 },
    ],
    subtotal: 250,
    shipping: 25,
    discount: 0,
    tax: 41,
    total: 316,
    shippingAddress: { name: 'طارق مبارك العمري', address: 'شارع الأمير فيصل 123', city: 'أبها', country: 'السعودية', phone: '+966505678902' },
    createdAt: '2024-01-01T15:30:00Z',
  },
  {
    id: 'ord-17',
    orderNumber: '#1017',
    customer: { id: 'cust-2', name: 'فاطمة سعيد الحربي', email: 'fatima@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-4', variantId: 'v13', title: 'عطر عربي فاخر', variantTitle: '100ml', quantity: 1, price: 450 },
      { productId: 'prod-8', variantId: 'v22', title: 'نظارة شمسية عصرية', variantTitle: 'أسود', quantity: 1, price: 180 },
    ],
    subtotal: 630,
    shipping: 0,
    discount: 63,
    tax: 85,
    total: 652,
    shippingAddress: { name: 'فاطمة سعيد الحربي', address: 'حي العليا، شارع التحلية', city: 'جدة', country: 'السعودية', phone: '+966507654321' },
    createdAt: '2023-12-30T11:45:00Z',
    paidAt: '2023-12-30T11:50:00Z',
    fulfilledAt: '2023-12-31T09:00:00Z',
    shippedAt: '2023-12-31T13:00:00Z',
    deliveredAt: '2024-01-02T10:00:00Z',
  },
  {
    id: 'ord-18',
    orderNumber: '#1018',
    customer: { id: 'cust-3', name: 'محمد عبدالله القحطاني', email: 'mohammed@example.com' },
    status: 'paid',
    paymentStatus: 'paid',
    fulfillmentStatus: 'unfulfilled',
    items: [
      { productId: 'prod-1', variantId: 'v5', title: 'قميص قطني كلاسيكي', variantTitle: 'أسود / L', quantity: 2, price: 120 },
    ],
    subtotal: 240,
    shipping: 25,
    discount: 24,
    tax: 36,
    total: 277,
    shippingAddress: { name: 'محمد عبدالله القحطاني', address: 'شارع الأمير سلطان 45', city: 'الدمام', country: 'السعودية', phone: '+966509876543' },
    createdAt: '2023-12-29T14:15:00Z',
    paidAt: '2023-12-29T14:20:00Z',
  },
  {
    id: 'ord-19',
    orderNumber: '#1019',
    customer: { id: 'cust-5', name: 'عبدالرحمن سالم الغامدي', email: 'abdulrahman@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-15', variantId: 'v43', title: 'طقم أقلام فاخر', variantTitle: 'أسود', quantity: 1, price: 280 },
    ],
    subtotal: 280,
    shipping: 25,
    discount: 0,
    tax: 46,
    total: 351,
    shippingAddress: { name: 'عبدالرحمن سالم الغامدي', address: 'شارع الأمير ناصر 78', city: 'المدينة المنورة', country: 'السعودية', phone: '+966504567890' },
    createdAt: '2023-12-28T10:00:00Z',
    paidAt: '2023-12-28T10:05:00Z',
    fulfilledAt: '2023-12-29T08:00:00Z',
    shippedAt: '2023-12-29T12:00:00Z',
    deliveredAt: '2023-12-31T09:00:00Z',
  },
  {
    id: 'ord-20',
    orderNumber: '#1020',
    customer: { id: 'cust-7', name: 'خالد عمر الزهراني', email: 'khaled@example.com' },
    status: 'fulfilled',
    paymentStatus: 'paid',
    fulfillmentStatus: 'fulfilled',
    items: [
      { productId: 'prod-3', variantId: 'v9', title: 'ساعة ذكية رياضية', variantTitle: 'أسود', quantity: 1, price: 750 },
      { productId: 'prod-5', variantId: 'v15', title: 'سماعات لاسلكية', variantTitle: 'أبيض', quantity: 1, price: 320 },
    ],
    subtotal: 1070,
    shipping: 0,
    discount: 107,
    tax: 145,
    total: 1108,
    shippingAddress: { name: 'خالد عمر الزهراني', address: 'شارع الثلاثين 156', city: 'الطائف', country: 'السعودية', phone: '+966506789012' },
    createdAt: '2023-12-27T16:30:00Z',
    paidAt: '2023-12-27T16:35:00Z',
    fulfilledAt: '2023-12-28T10:00:00Z',
    shippedAt: '2023-12-28T14:00:00Z',
    deliveredAt: '2023-12-30T11:00:00Z',
  },
];

// Customers
export interface Customer {
  id: string;
  name: string;
  email: string;
  phone: string;
  totalSpent: number;
  totalOrders: number;
  lastOrderDate: string;
  createdAt: string;
  addresses: Array<{
    id: string;
    name: string;
    address: string;
    city: string;
    country: string;
    phone: string;
    isDefault: boolean;
  }>;
  notes: string;
}

export const customers: Customer[] = [
  {
    id: 'cust-1',
    name: 'أحمد محمد العلي',
    email: 'ahmed@example.com',
    phone: '+966501234567',
    totalSpent: 715,
    totalOrders: 2,
    lastOrderDate: '2024-01-15T08:30:00Z',
    createdAt: '2023-06-15T10:00:00Z',
    addresses: [
      { id: 'addr-1', name: 'أحمد محمد العلي', address: 'شارع الملك فهد 123', city: 'الرياض', country: 'السعودية', phone: '+966501234567', isDefault: true },
    ],
    notes: 'عميل مميز يفضل التوصيل السريع',
  },
  {
    id: 'cust-2',
    name: 'فاطمة سعيد الحربي',
    email: 'fatima@example.com',
    phone: '+966507654321',
    totalSpent: 1170,
    totalOrders: 2,
    lastOrderDate: '2024-01-14T14:20:00Z',
    createdAt: '2023-07-20T14:30:00Z',
    addresses: [
      { id: 'addr-2', name: 'فاطمة سعيد الحربي', address: 'حي العليا، شارع التحلية', city: 'جدة', country: 'السعودية', phone: '+966507654321', isDefault: true },
    ],
    notes: '',
  },
  {
    id: 'cust-3',
    name: 'محمد عبدالله القحطاني',
    email: 'mohammed@example.com',
    phone: '+966509876543',
    totalSpent: 1508,
    totalOrders: 2,
    lastOrderDate: '2024-01-14T09:45:00Z',
    createdAt: '2023-05-10T09:00:00Z',
    addresses: [
      { id: 'addr-3', name: 'محمد عبدالله القحطاني', address: 'شارع الأمير سلطان 45', city: 'الدمام', country: 'السعودية', phone: '+966509876543', isDefault: true },
    ],
    notes: 'مهتم بالإلكترونيات والتقنية',
  },
  {
    id: 'cust-4',
    name: 'نورة خالد الشمري',
    email: 'noura@example.com',
    phone: '+966503456789',
    totalSpent: 960,
    totalOrders: 1,
    lastOrderDate: '2024-01-13T16:10:00Z',
    createdAt: '2023-08-05T11:15:00Z',
    addresses: [
      { id: 'addr-4', name: 'نورة خالد الشمري', address: 'حي النرجس، شارع الأندلس', city: 'الرياض', country: 'السعودية', phone: '+966503456789', isDefault: true },
    ],
    notes: 'تفضل العطور الشرقية',
  },
  {
    id: 'cust-5',
    name: 'عبدالرحمن سالم الغامدي',
    email: 'abdulrahman@example.com',
    phone: '+966504567890',
    totalSpent: 667,
    totalOrders: 2,
    lastOrderDate: '2024-01-12T11:30:00Z',
    createdAt: '2023-04-22T16:45:00Z',
    addresses: [
      { id: 'addr-5', name: 'عبدالرحمن سالم الغامدي', address: 'شارع الأمير ناصر 78', city: 'المدينة المنورة', country: 'السعودية', phone: '+966504567890', isDefault: true },
    ],
    notes: '',
  },
  {
    id: 'cust-6',
    name: 'سارة محمد العتيبي',
    email: 'sara@example.com',
    phone: '+966505678901',
    totalSpent: 817,
    totalOrders: 1,
    lastOrderDate: '2024-01-11T13:45:00Z',
    createdAt: '2023-09-12T10:30:00Z',
    addresses: [
      { id: 'addr-6', name: 'سارة محمد العتيبي', address: 'حي الصفا، شارع فلسطين', city: 'جدة', country: 'السعودية', phone: '+966505678901', isDefault: true },
    ],
    notes: 'تهتم بمنتجات العناية بالبشرة',
  },
  {
    id: 'cust-7',
    name: 'خالد عمر الزهراني',
    email: 'khaled@example.com',
    phone: '+966506789012',
    totalSpent: 1430,
    totalOrders: 2,
    lastOrderDate: '2024-01-10T10:20:00Z',
    createdAt: '2023-03-08T13:20:00Z',
    addresses: [
      { id: 'addr-7', name: 'خالد عمر الزهراني', address: 'شارع الثلاثين 156', city: 'الطائف', country: 'السعودية', phone: '+966506789012', isDefault: true },
    ],
    notes: 'عميل قديم ومخلص',
  },
  {
    id: 'cust-8',
    name: 'ريم عبدالعزيز المطيري',
    email: 'reem@example.com',
    phone: '+966507890123',
    totalSpent: 0,
    totalOrders: 1,
    lastOrderDate: '2024-01-09T15:00:00Z',
    createdAt: '2023-10-25T08:45:00Z',
    addresses: [
      { id: 'addr-8', name: 'ريم عبدالعزيز المطيري', address: 'حي الربوة، شارع العروبة', city: 'الرياض', country: 'السعودية', phone: '+966507890123', isDefault: true },
    ],
    notes: 'ألغت الطلب الأخير',
  },
  {
    id: 'cust-9',
    name: 'يوسف إبراهيم الدوسري',
    email: 'youssef@example.com',
    phone: '+966508901234',
    totalSpent: 288,
    totalOrders: 1,
    lastOrderDate: '2024-01-08T09:15:00Z',
    createdAt: '2023-11-18T15:00:00Z',
    addresses: [
      { id: 'addr-9', name: 'يوسف إبراهيم الدوسري', address: 'شارع الخليج 89', city: 'الخبر', country: 'السعودية', phone: '+966508901234', isDefault: true },
    ],
    notes: '',
  },
  {
    id: 'cust-10',
    name: 'منى حسن السبيعي',
    email: 'mona@example.com',
    phone: '+966509012345',
    totalSpent: 683,
    totalOrders: 1,
    lastOrderDate: '2024-01-07T14:30:00Z',
    createdAt: '2023-12-02T12:10:00Z',
    addresses: [
      { id: 'addr-10', name: 'منى حسن السبيعي', address: 'حي الملقا، شارع أبو بكر', city: 'الرياض', country: 'السعودية', phone: '+966509012345', isDefault: true },
    ],
    notes: 'تفضل الملابس التقليدية',
  },
  {
    id: 'cust-11',
    name: 'عمر فيصل العنزي',
    email: 'omar@example.com',
    phone: '+966501234568',
    totalSpent: 983,
    totalOrders: 1,
    lastOrderDate: '2024-01-06T11:00:00Z',
    createdAt: '2023-08-30T09:25:00Z',
    addresses: [
      { id: 'addr-11', name: 'عمر فيصل العنزي', address: 'شارع الملك عبدالله 234', city: 'بريدة', country: 'السعودية', phone: '+966501234568', isDefault: true },
    ],
    notes: '',
  },
  {
    id: 'cust-12',
    name: 'هند سعد الحارثي',
    email: 'hind@example.com',
    phone: '+966502345678',
    totalSpent: 0,
    totalOrders: 1,
    lastOrderDate: '2024-01-05T16:45:00Z',
    createdAt: '2023-12-20T14:35:00Z',
    addresses: [
      { id: 'addr-12', name: 'هند سعد الحارثي', address: 'حي الورود، شارع الأمير محمد', city: 'الرياض', country: 'السعودية', phone: '+966502345678', isDefault: true },
    ],
    notes: 'لم تكمل الدفع بعد',
  },
  {
    id: 'cust-13',
    name: 'سلمان راشد المالكي',
    email: 'salman@example.com',
    phone: '+966503456780',
    totalSpent: 697,
    totalOrders: 1,
    lastOrderDate: '2024-01-03T13:20:00Z',
    createdAt: '2023-11-05T10:50:00Z',
    addresses: [
      { id: 'addr-13', name: 'سلمان راشد المالكي', address: 'شارع التخصصي 67', city: 'الرياض', country: 'السعودية', phone: '+966503456780', isDefault: true },
    ],
    notes: '',
  },
  {
    id: 'cust-14',
    name: 'لمى عادل الرشيدي',
    email: 'lama@example.com',
    phone: '+966504567891',
    totalSpent: 352,
    totalOrders: 1,
    lastOrderDate: '2024-01-02T09:00:00Z',
    createdAt: '2023-10-10T11:40:00Z',
    addresses: [
      { id: 'addr-14', name: 'لمى عادل الرشيدي', address: 'حي الياسمين، شارع الأمير سلمان', city: 'الرياض', country: 'السعودية', phone: '+966504567891', isDefault: true },
    ],
    notes: 'تشتري منتجات العناية بالبشرة بانتظام',
  },
  {
    id: 'cust-15',
    name: 'طارق مبارك العمري',
    email: 'tarek@example.com',
    phone: '+966505678902',
    totalSpent: 0,
    totalOrders: 1,
    lastOrderDate: '2024-01-01T15:30:00Z',
    createdAt: '2023-12-28T16:15:00Z',
    addresses: [
      { id: 'addr-15', name: 'طارق مبارك العمري', address: 'شارع الأمير فيصل 123', city: 'أبها', country: 'السعودية', phone: '+966505678902', isDefault: true },
    ],
    notes: 'عميل جديد',
  },
];

// Discounts
export interface Discount {
  id: string;
  code: string;
  type: 'percentage' | 'fixed' | 'free_shipping';
  value: number;
  status: 'active' | 'scheduled' | 'expired';
  usageCount: number;
  usageLimit?: number;
  minSubtotal?: number;
  eligibleProducts?: string[];
  eligibleCategories?: string[];
  startDate: string;
  endDate?: string;
  createdAt: string;
}

export const discounts: Discount[] = [
  {
    id: 'disc-1',
    code: 'WELCOME10',
    type: 'percentage',
    value: 10,
    status: 'active',
    usageCount: 245,
    usageLimit: 500,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-03-31T23:59:59Z',
    createdAt: '2023-12-20T10:00:00Z',
  },
  {
    id: 'disc-2',
    code: 'FREESHIP',
    type: 'free_shipping',
    value: 0,
    status: 'active',
    usageCount: 180,
    minSubtotal: 200,
    startDate: '2024-01-01T00:00:00Z',
    createdAt: '2023-12-15T14:30:00Z',
  },
  {
    id: 'disc-3',
    code: 'NEWYEAR50',
    type: 'fixed',
    value: 50,
    status: 'expired',
    usageCount: 320,
    usageLimit: 300,
    minSubtotal: 300,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-01-07T23:59:59Z',
    createdAt: '2023-12-28T09:00:00Z',
  },
  {
    id: 'disc-4',
    code: 'SUMMER25',
    type: 'percentage',
    value: 25,
    status: 'scheduled',
    usageCount: 0,
    usageLimit: 200,
    eligibleCategories: ['ملابس رجالية', 'ملابس نسائية'],
    startDate: '2024-06-01T00:00:00Z',
    endDate: '2024-08-31T23:59:59Z',
    createdAt: '2024-01-10T11:15:00Z',
  },
  {
    id: 'disc-5',
    code: 'VIP100',
    type: 'fixed',
    value: 100,
    status: 'active',
    usageCount: 45,
    usageLimit: 100,
    minSubtotal: 500,
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-12-31T23:59:59Z',
    createdAt: '2023-12-01T08:00:00Z',
  },
  {
    id: 'disc-6',
    code: 'TECH15',
    type: 'percentage',
    value: 15,
    status: 'active',
    usageCount: 89,
    eligibleCategories: ['إلكترونيات'],
    startDate: '2024-01-01T00:00:00Z',
    endDate: '2024-06-30T23:59:59Z',
    createdAt: '2023-12-25T15:45:00Z',
  },
  {
    id: 'disc-7',
    code: 'BEAUTY20',
    type: 'percentage',
    value: 20,
    status: 'active',
    usageCount: 156,
    eligibleCategories: ['العناية الشخصية', 'عطور'],
    startDate: '2024-01-01T00:00:00Z',
    createdAt: '2023-11-15T10:30:00Z',
  },
  {
    id: 'disc-8',
    code: 'FLASH30',
    type: 'percentage',
    value: 30,
    status: 'expired',
    usageCount: 500,
    usageLimit: 500,
    startDate: '2024-01-10T09:00:00Z',
    endDate: '2024-01-10T21:00:00Z',
    createdAt: '2024-01-09T16:00:00Z',
  },
  {
    id: 'disc-9',
    code: 'LOYALTY50',
    type: 'fixed',
    value: 50,
    status: 'active',
    usageCount: 78,
    minSubtotal: 400,
    startDate: '2024-01-01T00:00:00Z',
    createdAt: '2023-10-20T12:00:00Z',
  },
  {
    id: 'disc-10',
    code: 'RAMADAN40',
    type: 'percentage',
    value: 40,
    status: 'scheduled',
    usageCount: 0,
    usageLimit: 1000,
    startDate: '2024-03-10T00:00:00Z',
    endDate: '2024-04-10T23:59:59Z',
    createdAt: '2024-01-05T09:30:00Z',
  },
];

// Analytics Data
export const analyticsData = {
  revenue: {
    daily: [
      { date: '2024-01-09', value: 2450 },
      { date: '2024-01-10', value: 3200 },
      { date: '2024-01-11', value: 2890 },
      { date: '2024-01-12', value: 3650 },
      { date: '2024-01-13', value: 4100 },
      { date: '2024-01-14', value: 3800 },
      { date: '2024-01-15', value: 4250 },
    ],
    weekly: [
      { date: 'الأسبوع 1', value: 18500 },
      { date: 'الأسبوع 2', value: 22400 },
      { date: 'الأسبوع 3', value: 19800 },
      { date: 'الأسبوع 4', value: 24340 },
    ],
  },
  orders: {
    daily: [
      { date: '2024-01-09', value: 12 },
      { date: '2024-01-10', value: 18 },
      { date: '2024-01-11', value: 15 },
      { date: '2024-01-12', value: 22 },
      { date: '2024-01-13', value: 25 },
      { date: '2024-01-14', value: 20 },
      { date: '2024-01-15', value: 28 },
    ],
    weekly: [
      { date: 'الأسبوع 1', value: 85 },
      { date: 'الأسبوع 2', value: 110 },
      { date: 'الأسبوع 3', value: 95 },
      { date: 'الأسبوع 4', value: 140 },
    ],
  },
  topProducts: [
    { name: 'ساعة ذكية رياضية', sales: 45, revenue: 38250 },
    { name: 'عباية مطرزة', sales: 38, revenue: 16720 },
    { name: 'حقيبة جلدية فاخرة', sales: 32, revenue: 15360 },
    { name: 'عطر عربي فاخر', sales: 28, revenue: 11760 },
    { name: 'قميص قطني كلاسيكي', sales: 52, revenue: 4680 },
  ],
  traffic: [
    { channel: 'البحث المباشر', visits: 4520, orders: 180, conversion: 3.98 },
    { channel: 'وسائل التواصل', visits: 3200, orders: 95, conversion: 2.97 },
    { channel: 'الإعلانات المدفوعة', visits: 2800, orders: 120, conversion: 4.29 },
    { channel: 'البريد الإلكتروني', visits: 1500, orders: 85, conversion: 5.67 },
    { channel: 'الإحالات', visits: 800, orders: 35, conversion: 4.38 },
  ],
};

// Format currency helper
export const formatCurrency = (amount: number): string => {
  return new Intl.NumberFormat('ar-SA', {
    style: 'currency',
    currency: 'SAR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(amount);
};

// Format date helper
export const formatDate = (dateString: string): string => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateString));
};

// Format datetime helper
export const formatDateTime = (dateString: string): string => {
  return new Intl.DateTimeFormat('ar-SA', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
  }).format(new Date(dateString));
};
