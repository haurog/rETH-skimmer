import github from '../img/github.svg';
import twitter from '../img/twitter.svg';
import discord from '../img/discord.svg';


export default function ContactFooter() {
  return (
    <footer className="bg-transparent">
      <div className="mx-full px-6 py-12 md:flex md:items-center md:justify-between lg:px-8">
        <div className="flex space-x-6 md:order-2 justify-self-end">
          <a href="https://github.com/haurog/rETH-skimmer">
            <img src={github} width="25" height="25" className="invert-colours" />
          </a>
          <a href="https://discord.com/users/866046126279884851">
            <img src={discord} width="25" height="25" className="invert-colours" />
          </a>
          <a href="https://twitter.com/haurog">
            <img src={twitter} width="25" height="25" className="invert-colours" />
          </a>
        </div>
        <div className="mt-8 md:order-1 md:mt-0">
          <p className="text-center text-xs leading-5 text-white">
            &copy; 2023 haurog
          </p>
        </div>
      </div>
    </footer>
  )
}