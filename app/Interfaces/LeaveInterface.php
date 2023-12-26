<?php

namespace App\Interfaces;

interface LeaveInterface
{
    public function save($data,$id);
    public function update($id,$data);
    public function getlist();
    public function userlist();
}
