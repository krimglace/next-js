import { getSession } from 'next-auth'
function Sessiontryuser({data}){
	return(
		<>
			hello - {data}
		</>
	)
}
export default Sessiontryuser;

export async function getServerSideProps(context){
	const session = await getSession(context)
	return{
		props: {
			data: session ? 'Session Success' : 'Session Failed,'
		},
	}
}