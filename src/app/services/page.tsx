export default function Services() {
    return (
      <div>
        <h1 className="text-3xl font-bold mb-6">Services</h1>
        <div className="grid gap-4">
          {['Webentwicklung', 'API Integration', 'Performance Optimierung'].map((service) => (
            <div key={service} className="p-4 border rounded">
              {service}
            </div>
          ))}
        </div>
      </div>
    )
  }