import React from 'react'
import PropTypes from 'prop-types'
import { Column, ColumnProps } from 'primereact/column'
import { classNames } from 'primereact/utils'

interface CustomColumnProps extends ColumnProps { }

function CustomColumn({ ...props }: CustomColumnProps) {
    return (
        <Column
            {...props}
            pt={{
                headerCell: {
                    className: "!text-[var(--surface-500)] text-xs !pb-[.3rem] uppercase"
                },
                headerContent: {
                    className: "justify-between"
                },
                sortIcon: {
                    className: "!text-[var(--surface-500)] !w-3 !h-3"
                }
            }
            }
        />
    )
}

export default CustomColumn
