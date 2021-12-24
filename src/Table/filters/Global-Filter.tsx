import React, { useState } from 'react'
import { useAsyncDebounce } from 'react-table'
// eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
type GlobalFilterProps = {
  preGlobalFilteredRows: any
  setGlobalFilter: any
  style: React.CSSProperties
}
export default function GlobalFilter({ preGlobalFilteredRows, setGlobalFilter, style }: GlobalFilterProps) {
  const count = preGlobalFilteredRows.length
  const [value, setValue] = useState<string>('')
  const onChange = useAsyncDebounce((value) => {
    setGlobalFilter(value || undefined)
  }, 300)

  return (
    <input
      style={style}
      value={value || ''}
      onChange={(e) => {
        setValue(e.target.value)
        onChange(value)
      }}
      placeholder={`Search ${count} records...`}
    />
  )
}
