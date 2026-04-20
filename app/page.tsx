import { ChatBox } from "./components/ChatBox";
import { FaqBox } from "./components/FaqBot";

export default function HomePage(){
  return (
    <main>
      <h1>Mall Document Manager</h1>
      <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Ullam eaque esse nam similique eveniet quasi dolores ducimus nobis dolore. Voluptas sed debitis at dolores id, alias eos, expedita explicabo ipsam molestias laboriosam fugiat adipisci ut similique, voluptates quos dolorem iusto facere eius eligendi rerum! Nisi commodi libero incidunt quos nesciunt!</p>
      <br></br>
      <ChatBox/>
      <FaqBox/>
    </main>

  )
}