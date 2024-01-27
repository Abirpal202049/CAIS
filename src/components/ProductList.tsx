"use client";
import React, { Key, useEffect, useState } from 'react'
import PropTypes from 'prop-types'
import { ProductService } from '@/data/ProductList';
import { DataView } from 'primereact/dataview';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';

ProductList.propTypes = {}

function ProductList({ data }: any) {
    const [products, setProducts] = useState<any>([]);
    const [headings, setHeadings] = useState<any>([]);

    useEffect(() => {
        ProductService.getProductsSmall().then((data) => {
            setProducts(data);
            setHeadings(Object.keys(data[0]));
        });
    }, []);

    const getSeverity = (product: any) => {
        switch (product.inventoryStatus) {
            case 'INSTOCK':
                return 'success';

            case 'LOWSTOCK':
                return 'warning';

            case 'OUTOFSTOCK':
                return 'danger';

            default:
                return null;
        }
    };

    return (
        <div>
            <DataTable
                value={products}
                tableStyle={{ minWidth: "50rem" }}
                paginator
                rows={5}
                rowsPerPageOptions={[5, 10, 25]}
                pt={{
                    root: {
                        className: "border border-[var(--primary-color)]"
                    }
                }}
            >
                {
                    headings.map((key: string, i: number) => {
                        // console.log(products)
                        return (
                            <Column
                                key={i}
                                field={key}
                                header={key}
                                sortable
                                pt={{
                                    headerCell: {
                                        className: "!text-[var(--surface-500)] text-xs !pb-[.3rem] uppercase !shadow-none"
                                    },
                                    headerContent: {
                                        className: "justify-between"
                                    },
                                    sortIcon: {
                                        className: "!text-[var(--surface-500)] !w-3 !h-3"
                                    }
                                }}
                            />
                        )
                    })
                }
            </DataTable>
        </div>
    )
}


export default ProductList
