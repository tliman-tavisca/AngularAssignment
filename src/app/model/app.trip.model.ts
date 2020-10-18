export class Trip {
  constructor(
    public TripId: number,
    public ProductId: string,
    public ProductName: string,
    public CategoryName: string,
    public Supplier: string,
    public Description: string,
    public BasePrice: number,
    public Status: string
  ) { }
}
