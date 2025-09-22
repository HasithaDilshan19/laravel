<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use App\Models\Todo;

class TodoController extends Controller
{
    // Get all todos
    public function index()
    {
        return response()->json(Todo::all());
    }

    // Create new todo
    public function store(Request $request)
    {
        $request->validate([
            'todo' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $todo = Todo::create($request->all());
        return response()->json($todo, 201);
    }

    // Get a single todo by ID
    public function show($id)
    {
        $todo = Todo::findOrFail($id);
        return response()->json($todo);
    }

    // Update a todo
    public function update(Request $request, $id)
    {
        $request->validate([
            'todo' => 'required|string|max:255',
            'date' => 'required|date',
        ]);

        $todo = Todo::findOrFail($id);
        $todo->update($request->all());
        return response()->json($todo);
    }

    // Delete a todo
    public function destroy($id)
    {
        Todo::destroy($id);
        return response()->json(null, 204);
    }
}
