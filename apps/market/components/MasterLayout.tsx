import React from "react";
import {
    Root,
    Header,
    Footer,
    AuthFooter,
    ImageSlider,
    ImageCard,
  } from "ui/components";
export default function MasterLayout({ children }) {
    return (
        <Root>
        <Header />
        <main className="block w-full grow">
            {children}
        </main>
        <Footer />
        <AuthFooter />
        <div className="block w-full p-6 space-y-6">
          <div className="flex w-full justify-center">
            <p className="text-2xl font-bold uppercase">Our Partners</p>
          </div>
          <div className="grid w-full grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {[...Array(4)].map((_, i: number) => (
              <ImageCard key={i} imgUrl="/shop-3.jpeg" />
            ))}
          </div>
        </div>
        <div className="flex w-full p-6 justify-start bg-gray-800">
          <p className="text-gray-500">
            Copyrights &copy; Wiaah 2021. All Rights Reserved.
          </p>
        </div>
      </Root>
    );
}