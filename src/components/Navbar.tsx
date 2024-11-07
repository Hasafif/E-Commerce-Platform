'use client'
import React, { useState } from 'react';
import { 
  ShoppingCart,
  User,
  LogOut,
  Bookmark,
  List,
  Package,
  LogInIcon,
  LogOutIcon,
} from 'lucide-react';
import { useRouter } from 'next/navigation';
import Cookies from 'js-cookie';
import { RootState } from '@/Store/store';
import { useSelector } from 'react-redux';
import Link from 'next/link';

const Navbar = () => {
 const router = useRouter();
    const user =  useSelector((state : RootState) => state.User.userData)
    const handleLogout = () => {
        Cookies.remove('token');
        localStorage.clear();
        location.reload();
    }
  return (
    <nav className="bg-gray-900 text-white shadow">
      <div className="max-w-7xl mx-auto px-4 py-4 flex justify-between items-center">
        <a href="/" className="text-xl font-bold">
          E-Store
        </a>

        {/* Navigation Links */}
        <div className="flex items-center space-x-6">
          <button onClick={() => router.push("/order/create-order")} className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <ShoppingCart className="w-5 h-5" />
            <span>Cart</span>
          </button>
          <button onClick={() => router.push("/order/view-orders")} className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <Package className="w-5 h-5" />
            <span>Orders</span>
          </button>
          <button onClick={() => router.push("/bookmark")} className="flex items-center space-x-2 hover:text-gray-400 transition-colors">
            <Bookmark className="w-5 h-5" />
            <span>Bookmarks</span>
          </button>
        </div>
        {!user && <div>
       <button title='Log In' onClick={() => router.push('/auth/login')}>
      <LogInIcon className="w-5 h-5" />
        </button>

        </div>}
          { user &&<div className="dropdown dropdown-end">
                    <label tabIndex={0} className="btn btn-ghost btn-circle avatar">
                        <div className="w-10 relative">
                        <User className="w-5 h-5" />
                        </div>
                    </label>
                    <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-gray-900 text-white rounded-box w-52">
                        <li>
                            <Link href={"/"} className="justify-between">
                                Support
                            </Link>
                        </li>
                        <li onClick={handleLogout}><button> Logout <LogOutIcon className="w-5 h-5" /></button></li>
                    </ul>
                </div>}
      </div>
    </nav>
  );
};

export default Navbar;