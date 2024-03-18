import { useParams } from "react-router-dom"
import { Wrapper } from "../components/table"
import useFetch from "../hooks/useFetch"
import Loader from "../components/Loader"

const UserDetails = () => {
  const { id } = useParams()
  const { data: user, loading } = useFetch(`https://dummyjson.com/users/${id}`)

  if (!user || loading) {
    return <Loader />
  }

  return (
    <Wrapper>
      <h1>{user.firstName}</h1>
      <p>{user.age}</p>
    </Wrapper>
  )
}

export default UserDetails
