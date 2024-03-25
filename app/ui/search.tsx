'use client';

import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';
import { useSearchParams, usePathname, useRouter } from 'next/navigation';
import { useDebouncedCallback } from 'use-debounce';

export default function Search({ placeholder }: { placeholder: string }) {
  const searchParams=useSearchParams();
  const pathName = usePathname();
  const {replace} = useRouter();
  //handles the search of invoices when text of input changes
  const handleSearch = useDebouncedCallback((term:string) => {
    console.log(`Searching...${term}`);
    //using URLSearchParams to capture and manipulate params
    const params = new URLSearchParams(searchParams);
    params.set('page', '1');
    if(term){
      // term is indicated we modify/add the query param
      params.set('query', term);
    }
    else{
      // delete the param unused
      params.delete('query');
    }
    replace(`${pathName}?${params.toString()}`);
  }, 500);

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor="search" className="sr-only">
        Search
      </label>
      <input onChange={(e) =>{handleSearch(e.target.value);}}
        className="peer block w-full rounded-md border border-gray-200 py-[9px] pl-10 text-sm outline-2 placeholder:text-gray-500"
        placeholder={placeholder}
        defaultValue={searchParams.get('query')?.toString()}
      />
      <MagnifyingGlassIcon className="absolute left-3 top-1/2 h-[18px] w-[18px] -translate-y-1/2 text-gray-500 peer-focus:text-gray-900" />
    </div>
  );
}
