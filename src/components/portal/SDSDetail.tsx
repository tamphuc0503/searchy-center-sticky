
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowLeft, Download, Calendar, Tag, Building, AlertTriangle, QrCode } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { SDSFile } from './MySDSFiles';
import QRCode from 'react-qr-code';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';

interface SDSDetailProps {
  sds: SDSFile;
  onBack: () => void;
}

const SDSDetail = ({ sds, onBack }: SDSDetailProps) => {
  // QR code value - typically a URL to the SDS document or a unique identifier
  const qrCodeValue = `sds://document/${sds.id}`;

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-4">
        <Button variant="outline" size="icon" onClick={onBack}>
          <ArrowLeft className="h-4 w-4" />
        </Button>
        <div>
          <h1 className="text-2xl font-bold">{sds.name}</h1>
          <p className="text-muted-foreground">Safety Data Sheet</p>
        </div>
        <div className="ml-auto flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button variant="outline" size="icon" className="flex items-center justify-center">
                <QrCode className="h-4 w-4" />
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-4">
              <div className="space-y-2">
                <h4 className="font-medium">SDS QR Code</h4>
                <p className="text-sm text-muted-foreground">Scan to access this SDS</p>
                <div className="p-2 bg-white rounded-md">
                  <QRCode value={qrCodeValue} size={150} />
                </div>
              </div>
            </PopoverContent>
          </Popover>
          <Button className="flex items-center gap-2">
            <Download className="h-4 w-4" />
            Download SDS
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2 space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>SDS Information</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="flex items-start gap-2">
                  <Building className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Manufacturer</p>
                    <p className="font-medium">{sds.manufacturer}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Tag className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Category</p>
                    <p className="font-medium">{sds.category}</p>
                  </div>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="h-5 w-5 text-muted-foreground mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date Added</p>
                    <p className="font-medium">{sds.dateAdded}</p>
                  </div>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="font-medium mb-2">Description</h3>
                <p className="text-sm text-muted-foreground">{sds.description || 'No description available.'}</p>
              </div>

              {sds.hazards && sds.hazards.length > 0 && (
                <>
                  <Separator />
                  <div>
                    <div className="flex items-center gap-2 mb-3">
                      <AlertTriangle className="h-5 w-5 text-amber-500" />
                      <h3 className="font-medium">Hazards</h3>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {sds.hazards.map((hazard, index) => (
                        <Badge key={index} variant="outline" className="bg-amber-50 text-amber-800 border-amber-200">
                          {hazard}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </>
              )}
            </CardContent>
          </Card>

          <Card>
            <CardHeader className="flex flex-row items-center justify-between">
              <CardTitle>SDS Document Preview</CardTitle>
              <div className="flex items-center gap-2">
                <QRCode value={qrCodeValue} size={60} />
              </div>
            </CardHeader>
            <CardContent className="h-80 flex items-center justify-center bg-muted/30">
              <div className="text-center text-muted-foreground">
                <p>Document preview not available</p>
                <p className="text-sm">Download the SDS to view the full document</p>
              </div>
            </CardContent>
          </Card>
        </div>

        <div className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Usage Information</CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-sm text-muted-foreground mb-4">
                This SDS is used in the following locations:
              </p>
              <div className="space-y-2">
                <div className="text-sm p-2 bg-muted rounded-md">Main Laboratory</div>
                <div className="text-sm p-2 bg-muted rounded-md">Chemical Storage Room B</div>
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>Related Chemicals</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                <div className="text-sm p-2 bg-muted rounded-md hover:bg-muted/80 cursor-pointer">Propanol</div>
                <div className="text-sm p-2 bg-muted rounded-md hover:bg-muted/80 cursor-pointer">Butanol</div>
                <div className="text-sm p-2 bg-muted rounded-md hover:bg-muted/80 cursor-pointer">Methyl Ethyl Ketone</div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default SDSDetail;
