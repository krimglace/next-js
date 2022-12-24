import { GetServerSideProps } from "next"
import cache from "src/cache"

interface IProps {
  coupon: string | null;
  name: string;
}
export default function Trynext({coupon, name } : IProps) {
  return (
    <div>
      {coupon ? (
        <h1>Your Coupon is {coupon}</h1>
      ) : (
        <h1>Sorry... not seeing one</h1>
      )}
      <p>{name} Thanks</p>
    </div>
  )
}

interface IPPPData {
  ppp: {
    pppConversionFactor: number;
  }
}

export const getServerSideProps: GetServerSideProps = async ({query}) => {
  const search = 'CO';

  // console.log(data)
  const fetcher = async () => {
    const url = `https://api.purchasing-power-parity.com/?target=${search}`

    const response = await fetch(url);
    const data: IPPPData = await response.json();

    console.log(new Date())
    let coupon: string | null = null;
    if(data.ppp.pppConversionFactor < 0.25){
      coupon = 'PPP75'
    } else if(data.ppp.pppConversionFactor < 0.50){
      coupon = 'PPP50'
    } else if(data.ppp.pppConversionFactor < 0.75){
      coupon = 'PPP25'
    }

    return coupon
  }

  const name = await cache.fetch('name', () => "Leigh", 60*60*24)

  const cachedCoupon = await cache.fetch(
    `ppp:${search}`,
    fetcher,
    60 * 60
  );
  console.log(query.id)
  return{
    props: {
      coupon: cachedCoupon, name
    }
  }
}
  // const url = `${process.env.NEXT_PUBLIC_API_SITE}/api/layanan?search=${search}`
  // const bearer = `Bearer ${process.env.NEXT_PUBLIC_BEARER_TOKEN}`

  // const response = await fetch(url,
  //                           {
  //                             method: "GET",
  //                             headers: {
  //                               'accept': 'application/json',
  //                               'Authorization': bearer,
  //                               'X-CSRF-TOKEN': ''
  //                             }
  //                           }
  //                         );
  // const data = await response.json();