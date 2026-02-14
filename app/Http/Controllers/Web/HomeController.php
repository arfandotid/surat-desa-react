<?php

namespace App\Http\Controllers\Web;

use Inertia\Inertia;
use App\Http\Controllers\Controller;

class HomeController extends Controller
{
    /**
     * index
     *
     * @return void
     */
    public function index()
    {
        return Inertia::render('Web/Home/Index');
    }
}
