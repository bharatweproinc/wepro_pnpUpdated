<?php

namespace App\Interfaces;

interface UserInterface
{

    public function getlist($data);
    public function save($data);
    public function detail($id);
    public function edit($id);
    public function update($id,$data);
    public function delete($id);

}
