import { Fragment, useState } from "react";
import { Dialog, Disclosure, Popover, Transition } from "@headlessui/react";
import logoMain from "../images/Savy (1).png";
import {
  ArrowPathIcon,
  Bars3Icon,
  ChartPieIcon,
  CursorArrowRaysIcon,
  FingerPrintIcon,
  SquaresPlusIcon,
  XMarkIcon,
} from "@heroicons/react/24/outline";
import {
  ChevronDownIcon,
  PhoneIcon,
  PlayCircleIcon,
} from "@heroicons/react/20/solid";

const products = [
  {
    name: "Analytics",
    description: "Get a better understanding of your traffic",
    href: "#",
    icon: ChartPieIcon,
  },
  {
    name: "Engagement",
    description: "Speak directly to your customers",
    href: "#",
    icon: CursorArrowRaysIcon,
  },
  {
    name: "Security",
    description: "Your customers’ data will be safe and secure",
    href: "#",
    icon: FingerPrintIcon,
  },
  {
    name: "Integrations",
    description: "Connect with third-party tools",
    href: "#",
    icon: SquaresPlusIcon,
  },
  {
    name: "Automations",
    description: "Build strategic funnels that will convert",
    href: "#",
    icon: ArrowPathIcon,
  },
];

const callsToAction = [
  { name: "Watch demo", href: "#", icon: PlayCircleIcon },
  { name: "Contact sales", href: "#", icon: PhoneIcon },
];

function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function HeaderMain() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="bg-transparent">
      <nav
        className="flex items-center justify-between p-2 mx-auto max-w-[95rem] lg:px-8"
        aria-label="Global"
      >
        <div className="flex lg:flex-1">
          <a href="/" className="-m-1.5 p-1.5">
            <span className="sr-only">Your Company</span>
            <img
              className="w-50 h-[200px]"
              src={logoMain}
              alt="company logo  "
            />
          </a>
        </div>
        <div className="flex lg:hidden">
          <button
            type="button"
            className="-m-2.5 inline-flex items-center justify-center rounded-md p-2.5 text-gray-700"
            onClick={() => setMobileMenuOpen(true)}
          >
            <span className="sr-only">Open main menu</span>
            <Bars3Icon className="w-6 h-6" aria-hidden="true" />
          </button>
        </div>
        <Popover.Group className="hidden lg:flex lg:gap-x-12 mb-[50px]">
          <Popover className="relative">
            <Popover.Button className="flex items-center font-semibold leading-6 text-white text-20px gap-x-1 hover:text-[#ff3b69]">
              Product
              <ChevronDownIcon
                className="flex-none w-5 h-5 text-white"
                aria-hidden="true"
              />
            </Popover.Button>
            <Transition
              as={Fragment}
              enter="transition ease-out duration-200"
              enterFrom="opacity-0 translate-y-1"
              enterTo="opacity-100 translate-y-0"
              leave="transition ease-in duration-150"
              leaveFrom="opacity-100 translate-y-0"
              leaveTo="opacity-0 translate-y-1"
            >
              <Popover.Panel className="absolute z-10 w-screen max-w-md mt-3 overflow-hidden text-white bg-black shadow-lg -left-8 top-full rounded-3xl ring-1 ring-gray-900/5">
                <div className="p-4">
                  {products.map((item) => (
                    <div
                      key={item.name}
                      className="relative flex items-center p-4 text-sm leading-6 rounded-lg group gap-x-6 hover:bg-[#dd335c]"
                    >
                      <div className="flex items-center justify-center flex-none bg-black rounded-lg h-11 w-11 group-hover:bg-[#dd335c]">
                        <item.icon
                          className="w-6 h-6 text-[#dd335c] group-hover:text-black"
                          aria-hidden="true"
                        />
                      </div>
                      <div className="flex-auto">
                        <a
                          href={item.href}
                          className="block font-semibold text-white"
                        >
                          {item.name}
                          <span className="absolute inset-0" />
                        </a>
                        <p className="mt-1 text-gray-400">{item.description}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <div className="grid grid-cols-2 divide-x divide-gray-900/5 bg-balck">
                  {callsToAction.map((item) => (
                    <a
                      key={item.name}
                      href={item.href}
                      className="flex items-center justify-center gap-x-2.5 p-3 text-sm font-semibold leading-6 text-[#dd335c]  hover:bg-[#000000] hover:text-white"
                    >
                      <item.icon
                        className="flex-none w-5 h-5 text-[#dd335c]  hover:text-white"
                        aria-hidden="true"
                      />
                      {item.name}
                    </a>
                  ))}
                </div>
              </Popover.Panel>
            </Transition>
          </Popover>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white hover:text-[#ff3b69]"
            style={{ fontSize: "20px" }}
          >
            Features
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white text-20px hover:text-[#ff3b69]"
            style={{ fontSize: "20px" }}
          >
            Marketplace
          </a>
          <a
            href="#"
            className="text-sm font-semibold leading-6 text-white text-20px hover:text-[#ff3b69]"
            style={{ fontSize: "20px" }}
          >
            Company
          </a>
        </Popover.Group>
        <div className="hidden gap-4 lg:flex lg:flex-1 lg:justify-end mb-[50px]">
          <button
            className="flex items-center justify-end text-white rounded-lg hover:text-[#dd335c]"
            onClick={() => {
              window.location.href = "/login";
            }}
          >
            Log in
          </button>
          <a
            href="#"
            className="px-4 py-2 text-sm font-semibold leading-6 text-white bg-[#dd335c] rounded-lg hover:bg-[#ff3b69]"
            onClick={() => {
              window.location.href = "/registration";
            }}
          >
            Sign up
          </a>
        </div>
      </nav>
      <Dialog
        className="lg:hidden"
        open={mobileMenuOpen}
        onClose={setMobileMenuOpen}
      >
        <div className="fixed inset-0 z-10" />
        <Dialog.Panel className="fixed inset-y-0 right-0 z-10 w-full px-6 py-6 overflow-y-auto bg-[#020617] sm:max-w-sm sm:ring-1 sm:ring-gray-900/10">
          {/* The rest of your mobile menu code */}
        </Dialog.Panel>
      </Dialog>
    </header>
  );
}
