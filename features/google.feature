
Feature: Searching for cucumbers
  As an internet user
  In order to find out more about cucumbers
  I want to be able to search for information about cucumbers
  
  @chrome @firefox
  Scenario: Google cucumber search
    When I search Google for "Boston US"
    Then I should see some results for "chrome"
    
  @bs_pc1
  Scenario: Google cucumber search
    When I search Google for "Boston US"
    Then I should see some results for "bs_pc1"
    
  @bs_m1 
  Scenario: Google cucumber search
    When I search Google for "Boston US"
    Then I should see some results for "bs_m1"
    
  @common
  Scenario: Google cucumber search
    When I search Google for "Oxford UK"
    Then I should see some results