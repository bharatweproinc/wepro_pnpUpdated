<?php

namespace App\Interfaces;

interface TaskInterface
{
    public function getlist($id);
    public function create($id);
    public function save($id,$data);
    public function edit($id);
    public function update($id,$data);
    public function detail($id);
    public function status($id,$data);
    public function multipleFile($id,$file,$type ,$data);
    public function filterData($data ,$id);
    public function image($id,$data);
}
