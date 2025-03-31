import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import VehicleFormWrapper from '@/components/forms/VehicleForm/VehicleFormWrapper';

const NewVehiclePage = () => {
  return (
    <div className="container mx-auto py-6 space-y-6">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">Add New Vehicle</h1>
      </div>

      <Card>
        <CardHeader>
          <CardTitle>Vehicle Information</CardTitle>
        </CardHeader>
        <CardContent>
          <VehicleFormWrapper
            initialData={{
              registrationNumber: '',
              make: '',
              model: '',
              year: '',
              color: '',
              bodyType: '',
              fuelType: '',
              notes: '',
            }}
            submitLabel="Add Vehicle"
          />
        </CardContent>
      </Card>
    </div>
  );
};

export default NewVehiclePage;
